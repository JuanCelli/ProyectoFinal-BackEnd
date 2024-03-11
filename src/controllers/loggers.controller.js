

export const loggersTest = async (req, res,next) => {
        req.logger.fatal("testing fatal")
        req.logger.error("testing error")
        req.logger.warning("testing warning")
        req.logger.http("testing http")
        req.logger.info("testing info")
        req.logger.debug("testing debug")

        res.status(200).json({status:"ok", message: "Test de logger realizado correctamente."})
}