import { SetChannel } from "./commands/SetChannel";
import { Warn } from "./commands/Warn";
import { Command } from "./types/Command";
import { ChannelName } from "./commands/ChannelName";
import { GetProfileCommand } from "./commands/GetProfile";
import { GetAppealsCommand } from "./commands/GetAppeals";
import { GetTicketsCommand } from "./commands/GetTickets";

export const Commands: Command[] = [
  Warn,
  SetChannel,
  ChannelName,
  GetProfileCommand,
  GetAppealsCommand,
  GetTicketsCommand,
];
