"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const SetChannel_1 = require("./commands/SetChannel");
const Warn_1 = require("./commands/Warn");
const ChannelName_1 = require("./commands/ChannelName");
const GetAppeals_1 = require("./commands/GetAppeals");
const GetTickets_1 = require("./commands/GetTickets");
const TicketDetail_1 = require("./commands/TicketDetail");
const IncidentReportMenu_1 = require("./commands/IncidentReportMenu");
const AppealReportMenu_1 = require("./commands/AppealReportMenu");
const SuggestionMenu_1 = require("./commands/SuggestionMenu");
const SetRole_1 = require("./commands/SetRole");
const AcademyMessage_1 = require("./commands/AcademyMessage");
const Ready_1 = require("./commands/Ready");
const SetTierLead_1 = require("./commands/SetTierLead");
const Lobby_1 = require("./commands/Lobby");
const Race_1 = require("./commands/Race");
const StewardsDescisions_1 = require("./commands/StewardsDescisions");
const ClearChannel_1 = require("./commands/ClearChannel");
const Calendar_1 = require("./commands/Calendar");
const Lineups_1 = require("./commands/Lineups");
const ProfilePicRequestMenu_1 = require("./commands/ProfilePicRequestMenu");
exports.Commands = [
    Warn_1.Warn,
    SetChannel_1.SetChannel,
    ChannelName_1.ChannelName,
    GetAppeals_1.GetAppealsCommand,
    GetTickets_1.GetTicketsCommand,
    TicketDetail_1.GetTicketCommand,
    IncidentReportMenu_1.IncidentReportMenu,
    AppealReportMenu_1.AppealReportMenu,
    SuggestionMenu_1.SuggestionMenu,
    SetRole_1.SetRole,
    AcademyMessage_1.AcademyMsg,
    Ready_1.Ready,
    SetTierLead_1.SetTierLead,
    Lobby_1.Lobby,
    Race_1.Race,
    StewardsDescisions_1.StewardsDescisions,
    ClearChannel_1.ClearChannel,
    Calendar_1.Calendar,
    Lineups_1.Lineups,
    ProfilePicRequestMenu_1.ProfilePicRequestMenu,
];
//# sourceMappingURL=Commands.js.map