import winston, { transports } from "winston";
import { environment } from "./config.js";
const colorizer = winston.format.colorize();




let alignColorsAndTime = winston.format.combine(
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.timestamp({
        format:"YY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
)


const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        http: 'red',
        info: 'blue',
        debug: 'white'
    }
}

const prodLogger = winston.createLogger({
    // Declaramos el trasnport
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "info",
                colors: customLevelsOptions.colors,
                format: winston.format.combine(
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'error',
                format: winston.format.combine(
                    // winston.format.colorize(),
                    winston.format.simple()
                )
            }
        )
    ]
})


const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(alignColorsAndTime)
            }
        ),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
})


export const addLogger = (req, res, next) => {
    if (environment === 'prod') {
        req.logger = prodLogger
    } else {
        req.logger = devLogger
    }
    next();
}
winston.addColors(customLevelsOptions.colors)