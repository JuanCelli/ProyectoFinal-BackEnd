import errorsEnum from '../errors.enum.js'

const ErrorHandler = (error, req, res, next) => {
    // req.logger.error(error.cause)
    switch (error.code) {
        case errorsEnum.INVALID_TYPES_ERROR:
            req.logger.error(error.message)
            res.status(400).json({ status: "error", error: error.message });
            break;
        case errorsEnum.NOT_FOUND_ERROR:
            req.logger.error(error.message)
            res.status(404).json({ status: "error", error: error.message });
            break;
        default:
            res.status(500).json({ status: "error", error: "Unhandled error!" });
    }
};

export default ErrorHandler