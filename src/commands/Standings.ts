import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../types/Command";
import * as Figma from "figma-api";
import { Error } from "../utils/Error";
import { log } from "../utils/Logger";

export const Standings: Command = {
  name: "standings",
  description: "Gets you the standings graphics",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "tier",
      description: "Select the tier you want!",
      choices: [
        { name: "Tier 1", value: "2:16" },
        { name: "Tier 2", value: "406:667" },
        { name: "Tier 3", value: "4:265" },
        { name: "Tier M", value: "406:1251" },
        { name: "Tier H", value: "1002:2" },
        { name: "Team standings", value: "16:1142" },
      ],
      required: true,
    },
  ],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (process.env.FIGMA_TOKEN && interaction.options.data[0].value) {
      try {
        const api = new Figma.Api({
          personalAccessToken: process.env.FIGMA_TOKEN,
        });
        const image = await api.getImage("d4sDj6FfYxdOszlQbdOhqu", {
          ids: interaction.options.data[0].value.toString(),
          scale: 1,
          format: "png",
        });
        if (image.status) {
          const errEmbed = Error(
            "Standings",
            "There was an error getting the standings.",
            new RangeError("Image not found")
          );
          log.error(
            "Image for standings not found" + interaction.options.data[0].name
          );
          await interaction.followUp({ embeds: [errEmbed] });
        }
        const imgLink =
          image.images[interaction.options.data[0].value.toString()];
        const embed = new EmbedBuilder().setImage(imgLink).setColor(16236412);
        await interaction.followUp({ embeds: [embed] });
      } catch (err) {
        const errEmbed = Error(
          "Standings",
          "There was an error getting the standings.",
          err as Error
        );
        log.error(err);
        await interaction.followUp({ embeds: [errEmbed] });
      }
    }
  },
};
