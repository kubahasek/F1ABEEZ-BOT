import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../types/Command";
import { GetTickets } from "../utils/Notion";
import { log } from "../utils/Logger";
import { Error } from "../utils/Error";

export const GetTicketsCommand: Command = {
  name: "gettickets",
  description: "Gets you tickets associated with your gamertag.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "gamertag",
      description: "Put in your gamertag",
      required: true,
    },
  ],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.options.data[0].value) {
      try {
        const tickets = await GetTickets(
          interaction.options.data[0].value.toString()
        );
        await interaction.followUp({ embeds: [tickets] });
      } catch (err) {
        if (err instanceof Object) {
          log.error(err);
          const errEmbed = Error(
            interaction.options.data[0].value.toString(),
            "There was en error getting the tickets for your profile. Read the gamertag and make sure it's correct. If you think this is a mistake, please contact the admins!",
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
