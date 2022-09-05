import { AppealReportButtonHandler } from "./buttonHandlers/AppealReport";
import { IncidentReportButtonHandler } from "./buttonHandlers/IncidentReport";
import { ProfilePicRequestHandler } from "./buttonHandlers/ProfilePicRequest";
import { SuggestionButtonHandler } from "./buttonHandlers/SuggestionSubmission";
import { ButtonHandler } from "./types/ButtonHandler";

export const buttonHandlers: ButtonHandler[] = [
  IncidentReportButtonHandler,
  AppealReportButtonHandler,
  SuggestionButtonHandler,
  ProfilePicRequestHandler,
];
