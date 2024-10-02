// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7a61d2de26eea7aef3b8940783a42639@o4508052719599616.ingest.de.sentry.io/4508052721696848",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  tracesSampleRate: 1,
});
