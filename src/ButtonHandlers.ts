import { AppealReportButtonHandler } from "./buttonHandlers/AppealReport";
import { IncidentReportButtonHandler } from "./buttonHandlers/IncidentReport";
import { ButtonHandler } from "./types/ButtonHandler";

export const buttonHandlers: ButtonHandler[] = [
  IncidentReportButtonHandler,
  AppealReportButtonHandler,
];
