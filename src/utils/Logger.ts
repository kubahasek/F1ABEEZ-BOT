import Rollbar from "rollbar";

export const log = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  reportLevel: "debug",
  verbose: true,
  environment: process.env.PRODUCTION === "true" ? "production" : "development",
});
