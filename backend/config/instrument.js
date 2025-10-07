// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";


Sentry.init({
  dsn: "https://2af51df6be4828b80f6e1877d7e697f7@o4510149306351616.ingest.us.sentry.io/4510149313167360",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongooseIntegration()],
});