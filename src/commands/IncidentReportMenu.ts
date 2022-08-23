import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { Command } from "../types/Command";

export const IncidentReportMenu: Command = {
  name: "incidentmenu",
  description: "Sends the incident report menu",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: [PermissionFlagsBits.Administrator],
  options: [],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor(16236412)
      .setTitle("Report an incident")
      .setDescription("Click the button below to report an incident!");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("incidentreportbutton")
        .setEmoji("📩")
    );
    const channel = await client.channels.fetch(interaction.channelId);
    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed], components: [row] });
      interaction.followUp({ content: "Done!", ephemeral: true }).then((msg) =>
        setTimeout(() => {
          msg.channel.messages.fetch(msg.id).then((msg) => msg.delete());
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
