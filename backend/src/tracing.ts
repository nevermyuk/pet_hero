import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import {
    CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator
} from '@opentelemetry/core';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

import * as process from 'process';

const provider = new NodeTracerProvider();
provider.register();

const otelSDK = new NodeSDK({
    metricReader: new PrometheusExporter({
        port: 8081,
    }),
    spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
    contextManager: new AsyncLocalStorageContextManager(),
    textMapPropagator: new CompositePropagator({
        propagators: [
            new JaegerPropagator(),
            new W3CTraceContextPropagator(),
            new W3CBaggagePropagator(),
            new B3Propagator(),
            new B3Propagator({
                injectEncoding: B3InjectEncoding.MULTI_HEADER,
            }),
        ],
    }),
    instrumentations: [
        new ExpressInstrumentation(),
        new NestInstrumentation(),
        new PinoInstrumentation({
            // Optional hook to insert additional context to log object.
            logHook: (span, record, level) => {
                record['resource.service.name'] = provider.resource.attributes['service.name'];
            },
        }), new PinoInstrumentation()
    ],
});

export default otelSDK;
// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SDK shut down successfully'),
            (err) => console.log('Error shutting down SDK', err),
        )
        .finally(() => process.exit(0));
});
