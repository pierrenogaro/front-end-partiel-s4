const Home = () => {

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="display-5 fw-bold mb-4">Welcome to Client App</h1>
                            <div className="d-flex gap-2">
                                <a href="/login" className="btn btn-primary">Log in</a>
                                <a href="/register" className="btn btn-outline-primary">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
