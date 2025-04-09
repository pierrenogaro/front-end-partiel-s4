import React from 'react';
import QRScanner from '../components/QRScanner';

const ScanPage = () => {
    const handleScanSuccess = (data) => {
        console.log('QR Code scanned successfully:', data);
    };

    return (
        <div>
            <h1 className="text-center mb-4">Scan Page</h1>
            <QRScanner onScanSuccess={handleScanSuccess} />
        </div>
    );
};

export default ScanPage;
