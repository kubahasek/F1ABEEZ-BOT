import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../types/Command";
import { GetProfile, Profile } from "../utils/Notion";

export const GetProfileCommand: Command = {
  name: "getprofile",
  description: "Gets you profile information from our website!",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "gamertag",
      description: "Put in your gamertag",
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.options.data[0].value) {
      const profile = await GetProfile(
        interaction.options.data[0].value.toString()
      );

      let embed = new EmbedBuilder()
        .setTitle(interaction.options.data[0].value.toString())
        .setColor(16236412)
        .addFields(
          { name: "Tier", value: profile.tier },
          { name: "Team", value: profile.team },
          { name: "F1 Points", value: profile.pointsF1.toString() },
          { name: "Penalty Points", value: profile.penaltyPoints.toString() }
        );

      await interaction.followUp({
        embeds: [embed],
      });
    }
  },
};
