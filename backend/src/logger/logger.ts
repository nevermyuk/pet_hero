import { context, trace } from '@opentelemetry/api';
import Pino, { Logger, LoggerOptions, transport } from 'pino';
export const loggerOptions: LoggerOptions = {
    level: 'info',
    formatters: {
        level(label) {
            return { level: label };
        },
        // Workaround for PinoInstrumentation (does not support latest version yet)
        log(object) {
            const span = trace.getSpan(context.active());
            if (!span) return { ...object };
            const { spanId, traceId } = trace
                .getSpan(context.active())
                ?.spanContext();
            return { ...object, spanId, traceId };
        },
    },
};

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
            application: "pet-hero-backend"
        }
    },
});

export const logger: Logger = Pino(
    loggerOptions,
    pinoTransport
    // destination(process.env.LOG_FILE_NAME),
);
