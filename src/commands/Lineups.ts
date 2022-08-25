import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../types/Command";

export const Lineups: Command = {
  name: "lineups",
  description: "Responds with a link to the lineups!",
  type: ApplicationCommandType.ChatInput,
  options: [],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    await interaction.followUp({
      content: "<https://www.f1abeez.com/line-ups>",
    });
  },
};
