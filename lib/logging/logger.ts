// lib/logging/logger.ts
import winston from 'winston';

const { combine, timestamp, json, colorize, printf } = winston.format;

// Development için okunabilir format
const devFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Production'da Loki/ELK için JSON, Dev'de okunabilir format
    process.env.NODE_ENV === 'production' ? json() : combine(colorize(), devFormat)
  ),
  defaultMeta: { service: 'archetype-web' },
  transports: [
    new winston.transports.Console(),
    // Production'da dosya veya HTTP transport eklenebilir
    // new winston.transports.Http({ host: 'loki', path: '/loki/api/v1/push' })
  ],
});

// Request Logger Middleware Helper
export const logRequest = (req: Request, context: string) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`, {
    context,
    headers: req.headers,
    // Hassas verileri loglamamaya dikkat edin
  });
};