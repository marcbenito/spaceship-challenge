import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = './logs';

if (!existsSync(logDir)) {
    mkdirSync(logDir);
}

const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'HH:mm:ss'
        }),
        logFormat
    ),
    transports: [
        // debug log setting
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/debug',
            filename: `%DATE%.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true
        }),
        // error log setting
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.log`,
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true
        })
    ]
});
if (process.env.NODE_ENV !== 'test') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.splat(), winston.format.colorize())
        })
    );
}

const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};

export { logger, stream };
