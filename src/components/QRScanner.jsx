import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess }) => {
    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        scannerRef.current = new Html5Qrcode("reader");

        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(err => console.error(err));
            }
        };
    }, []);

    const startScanning = () => {
        if (!scannerRef.current) return;
        setScannedData(null);
        setError(null);

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        };

        setScanning(true);
        scannerRef.current.start(
            { facingMode: "environment" },
            config,
            async (decodedText) => {
                try {
                    let jsonData;
                    try {
                        jsonData = JSON.parse(decodedText);
                    } catch (parseError) {
                        jsonData = decodedText;
                    }

                    setScannedData(jsonData);

                    if (onScanSuccess) {
                        onScanSuccess(jsonData);
                    }

                    await scannerRef.current.stop();
                    setScanning(false);
                } catch (err) {
                    setError("Error processing data");
                    console.error(err);
                }
            },
            (errorMessage) => {
                console.log(errorMessage);
            }
        ).catch(err => {
            setError("Camera access error");
            console.error(err);
            setScanning(false);
        });
    };

    const stopScanning = async () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            await scannerRef.current.stop();
            setScanning(false);
        }
    };

    const resetScan = () => {
        setScannedData(null);
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Scan QR Code</h2>
                </div>
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {!scannedData ? (
                        <>
                            <div id="reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>

                            <div className="d-grid gap-2 mt-3">
                                {!scanning ? (
                                    <button onClick={startScanning} className="btn btn-primary">
                                        Start Scanning
                                    </button>
                                ) : (
                                    <button onClick={stopScanning} className="btn btn-danger">
                                        Stop Scanning
                                    </button>
                                )}
                            </div>

                            <p className="text-center mt-2">
                                Place the product QR code in the frame
                            </p>
                        </>
                    ) : (
                        <div className="scan-result">
                            <h3>Scanned Data:</h3>
                            <pre style={{
                                backgroundColor: '#f5f5f5',
                                padding: '10px',
                                borderRadius: '5px',
                                overflow: 'auto',
                                maxWidth: '100%'
                            }}>
                                {typeof scannedData === 'object'
                                    ? JSON.stringify(scannedData, null, 2)
                                    : scannedData}
                            </pre>
                            <div className="d-grid gap-2 mt-3">
                                <button onClick={resetScan} className="btn btn-primary">
                                    Scan Again
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRScanner;
