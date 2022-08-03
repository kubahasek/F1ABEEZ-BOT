import { SetChannel } from "./commands/SetChannel";
import { Warn } from "./commands/Warn";
import { Command } from "./types/Command";
import { ChannelName } from "./commands/ChannelName";

export const Commands: Command[] = [Warn, SetChannel, ChannelName];
