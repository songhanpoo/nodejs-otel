const { CollectorMetricExporter } = require('@opentelemetry/exporter-collector');
const { MeterProvider } = require('@opentelemetry/metrics');
const collectorOptions = {
  url: 'http://localhost:55681', // url is optional and can be omitted - default is http://localhost:55681/v1/metrics
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 1, // an optional limit on pending requests,
  serviceName: 'consumer-service',
};

const metricExporter = new CollectorMetricExporter(collectorOptions);
console.log(metricExporter);
// Initialize the Meter to capture measurements in various ways.
const meter = new MeterProvider({
  exporter: metricExporter,
  interval: 30000,
}).getMeter('consumer-service');

module.exports.meter = meter;
