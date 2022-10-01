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
import { AcademyMsg } from "./commands/AcademyMessage";
import { Ready } from "./commands/Ready";
import { SetTierLead } from "./commands/SetTierLead";
import { Lobby } from "./commands/Lobby";
import { Race } from "./commands/Race";
import { StewardsDescisions } from "./commands/StewardsDescisions";
import { Standings } from "./commands/Standings";
import { ClearChannel } from "./commands/ClearChannel";
import { Calendar } from "./commands/Calendar";
import { Lineups } from "./commands/Lineups";
import { ProfilePicRequestMenu } from "./commands/ProfilePicRequestMenu";

export const Commands: Command[] = [
  Warn,
  SetChannel,
  ChannelName,
  GetAppealsCommand,
  GetTicketsCommand,
  GetTicketCommand,
  IncidentReportMenu,
  AppealReportMenu,
  SuggestionMenu,
  SetRole,
  AcademyMsg,
  Ready,
  SetTierLead,
  Lobby,
  Race,
  StewardsDescisions,
  ClearChannel,
  Calendar,
  Lineups,
  ProfilePicRequestMenu,
];
