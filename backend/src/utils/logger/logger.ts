import { Logger, createLogger, format, transports } from 'winston';

const { printf, combine, timestamp } = format;

function timezoned() {
  return new Date().toLocaleString('en-US');
}

const myFormat = printf(
  (info) => `${info.level}  - ${info.timestamp}  - ${info.message.replace(/\n/g, '')}`,
);

const logger: Logger = createLogger({
  format: combine(timestamp({ format: timezoned }), myFormat),
  transports: [new transports.Console()],
});
export default logger;
