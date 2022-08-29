"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const tslib_1 = require("tslib");
const rollbar_1 = tslib_1.__importDefault(require("rollbar"));
exports.log = new rollbar_1.default({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    reportLevel: "debug",
    verbose: true,
    environment: process.env.PRODUCTION === "true" ? "production" : "development",
});
//# sourceMappingURL=Logger.js.map