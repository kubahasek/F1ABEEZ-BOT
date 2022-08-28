import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} from "discord.js";
import { ErrorEmbed } from "../utils/Error";
import { Command } from "../types/Command";
import { GetTicket } from "../utils/Notion";
import { log } from "../utils/Logger";

export const GetTicketCommand: Command = {
  name: "ticketdetail",
  description: "Gets you the ticket detail",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "ticketno",
      description: "Enter the case number of the ticket you are looking for",
      required: true,
    },
  ],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.options.data[0].value) {
      try {
        const ticket = await GetTicket(
          interaction.options.data[0].value.toString()
        );

        await interaction.followUp({
          embeds: [ticket],
        });
      } catch (err) {
        if (err instanceof Object) {
          log.error(err);
          const errEmbed = ErrorEmbed(
            interaction.options.data[0].value.toString(),
            "There was en error getting the ticket you were looking for. Read the gamertag and make sure it's correct. If you think this is a mistake, please contact the admins!",
            err as Error
          );
          await interaction.followUp({
            embeds: [errEmbed],
          });
        } else {
          log.error(err as Error);
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
