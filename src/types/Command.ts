import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  ephemeral: boolean;
  run: (client: Client, interaction: CommandInteraction) => void;
}
