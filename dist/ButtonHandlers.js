"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonHandlers = void 0;
const AppealReport_1 = require("./buttonHandlers/AppealReport");
const IncidentReport_1 = require("./buttonHandlers/IncidentReport");
const ProfilePicRequest_1 = require("./buttonHandlers/ProfilePicRequest");
const SuggestionSubmission_1 = require("./buttonHandlers/SuggestionSubmission");
exports.buttonHandlers = [
    IncidentReport_1.IncidentReportButtonHandler,
    AppealReport_1.AppealReportButtonHandler,
    SuggestionSubmission_1.SuggestionButtonHandler,
    ProfilePicRequest_1.ProfilePicRequestHandler,
];
//# sourceMappingURL=ButtonHandlers.js.map