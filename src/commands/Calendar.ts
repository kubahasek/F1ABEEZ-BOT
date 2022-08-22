import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../types/Command";
import { log } from "../utils/Logger";
import { Error } from "../utils/Error";
import * as Figma from "figma-api";

export const Calendar: Command = {
  name: "calendar",
  description: "Gets you the current calendar",
  type: ApplicationCommandType.ChatInput,
  options: [],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (process.env.FIGMA_TOKEN) {
      try {
        const api = new Figma.Api({
          personalAccessToken: process.env.FIGMA_TOKEN,
        });
        const image = await api.getImage("8mL0mwOKyIUcoLG3goL7wk", {
          ids: "102:367",
          scale: 1,
          format: "png",
        });
        if (image.status) {
          const errEmbed = Error(
            "Calendar",
            "There was an error getting the calendar.",
            new RangeError("Image not found")
          );
          log.error("Image for calendar not found");
          await interaction.followUp({ embeds: [errEmbed] });
        }
        const imgLink = image.images["102:367"];
        const embed = new EmbedBuilder().setImage(imgLink).setColor(16236412);
        await interaction.followUp({ embeds: [embed] });
      } catch (err) {
        const errEmbed = Error(
          "Calendar",
          "There was an error getting the calendar.",
          err as Error
        );
        log.error(err);
        await interaction.followUp({ embeds: [errEmbed] });
      }
    }
  },
};
