import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../types/Command";

export const Ready: Command = {
  name: "ready",
  description: "Sends the ready up message to tier drivers",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "tier",
      description: "Select the tier you want!",
      choices: [
        { name: "Tier 1", value: "tier1" },
        { name: "Tier 2", value: "tier2" },
        { name: "Tier 3", value: "tier3" },
        { name: "Tier M", value: "tierM" },
        { name: "Tier H", value: "tierH" },
      ],
    },
  ],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {},
};
