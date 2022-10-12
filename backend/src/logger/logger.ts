import { context, trace } from '@opentelemetry/api';
import Pino, { Logger, LoggerOptions, transport } from 'pino';
export const loggerOptions: LoggerOptions = {
    formatters: {
        log(object) {
            const span = trace.getSpan(context.active());
            if (!span) return { ...object };
            const { spanId, traceId } = trace.getSpan(context.active())?.spanContext();
            return { ...object, spanId, traceId };
        },
    },
};
export const pinoPrettyTransport = transport({
    target: 'pino-pretty',
    options: {
        colorize: true,
        destination: 1
    }

})


export const pinoTransport = transport({
    target: "pino-loki",
    options: {
        batching: true,
        interval: 5,
        host: "http://host.docker.internal:3100",
        basicAuth: {
            username: "username",
            password: "password",
        },
        labels: {
            application: "pet-hero-backend",
            job: "backend"
        }
    },
});

export const logger: Logger = Pino(
    loggerOptions,
    process.env.NODE_ENV === 'production' ? pinoTransport : pinoPrettyTransport
    // destination(process.env.LOG_FILE_NAME),
);
