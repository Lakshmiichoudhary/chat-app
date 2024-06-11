const notFound = (req,res,next) => {
    const error = new Error('Not FOUND');
    res.status(404);
    next(error)
};

const errorHandler = (err,req,res,next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: message
        }
    });
}

module.exports = {notFound,errorHandler}