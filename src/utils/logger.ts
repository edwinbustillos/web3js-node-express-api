import { createLogger, transports, format } from 'winston';
const logTimestampFormat = 'YYYY-MM-DD HH:mm:ss';
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: logTimestampFormat }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [new transports.Console()],
});
export default logger;
