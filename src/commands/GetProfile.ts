import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} from "discord.js";
import { Error } from "../utils/Error";
import { Command } from "../types/Command";
import { GetProfile, Profile } from "../utils/Notion";
import { log } from "../utils/Logger";

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
      try {
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
      } catch (err) {
        if (err instanceof Object) {
          log.error(err);
          const errEmbed = Error(
            interaction.options.data[0].value.toString(),
            "There was en error getting your profile. Read the gamertag and make sure it's correct. If you think this is a mistake, please contact the admins!",
            err as Error
          );
          await interaction.followUp({
            embeds: [errEmbed],
          });
        } else {
          log.error(err);
          await interaction.followUp({
            content:
              "There was an error. Please contact the admins and screenshot this message. Error: " +
              String(err),
          });
        }
      }
    }
  },
};
