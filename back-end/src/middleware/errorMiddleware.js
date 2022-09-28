const errorHandlerMiddleware = (err, _req, res, _next) => {
    const { status, message } = err;

    if (!status) return res.status(500).json({ message: 'Internal sever error !' });

    res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;
