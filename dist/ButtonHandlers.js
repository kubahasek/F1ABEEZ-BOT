"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonHandlers = void 0;
const AppealReport_1 = require("./buttonHandlers/AppealReport");
const IncidentReport_1 = require("./buttonHandlers/IncidentReport");
const SuggestionSubmission_1 = require("./buttonHandlers/SuggestionSubmission");
exports.buttonHandlers = [
    IncidentReport_1.IncidentReportButtonHandler,
    AppealReport_1.AppealReportButtonHandler,
    SuggestionSubmission_1.SuggestionButtonHandler,
];
//# sourceMappingURL=ButtonHandlers.js.map