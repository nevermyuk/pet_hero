import Pino, { Logger, LoggerOptions, transport } from 'pino';
export const loggerOptions: LoggerOptions = {
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
            application: "pet-hero-backend"
        }
    },
});

export const logger: Logger = Pino(
    loggerOptions,
    pinoPrettyTransport
    // destination(process.env.LOG_FILE_NAME),
);
