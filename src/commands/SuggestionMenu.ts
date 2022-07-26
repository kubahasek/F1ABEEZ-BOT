import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";

export const SuggestionMenu: Command = {
  name: "suggestionmenu",
  description: "Sends the suggestion menu",
  type: ApplicationCommandType.ChatInput,
  options: [],
  ephemeral: false,
  defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor(16236412)
      .setTitle("Submit a suggestion")
      .setDescription("Click the button below to submit a suggestion!");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("suggestionbutton")
        .setEmoji("📩")
    );
    const channel = await client.channels.fetch(interaction.channelId);
    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed], components: [row] });
      interaction.followUp({ content: "Done!", ephemeral: true }).then((msg) =>
        setTimeout(() => {
          msg.delete();
        }, 10000)
      );
    } else {
      await interaction.followUp({
        content: "Could not send the menu in here, report this to the admins!",
        ephemeral: true,
      });
    }
  },
};
