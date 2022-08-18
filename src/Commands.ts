import { SetChannel } from "./commands/SetChannel";
import { Warn } from "./commands/Warn";
import { Command } from "./types/Command";
import { ChannelName } from "./commands/ChannelName";
import { GetProfileCommand } from "./commands/GetProfile";
import { GetAppealsCommand } from "./commands/GetAppeals";
import { GetTicketsCommand } from "./commands/GetTickets";
import { GetTicketCommand } from "./commands/TicketDetail";
import { IncidentReportMenu } from "./commands/IncidentReportMenu";
import { AppealReportMenu } from "./commands/AppealReportMenu";
import { SuggestionMenu } from "./commands/SuggestionMenu";
import { SetRole } from "./commands/SetRole";

export const Commands: Command[] = [
  Warn,
  SetChannel,
  ChannelName,
  GetProfileCommand,
  GetAppealsCommand,
  GetTicketsCommand,
  GetTicketCommand,
  IncidentReportMenu,
  AppealReportMenu,
  SuggestionMenu,
  SetRole,
];
