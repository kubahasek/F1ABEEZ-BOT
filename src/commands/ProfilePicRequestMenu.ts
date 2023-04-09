import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";

export const ProfilePicRequestMenu: Command = {
  name: "profilepicmenu",
  description: "Sends the menu for requesting profile pictures",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
  options: [],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor(16236412)
      .setTitle("Request a profile pic!")
      .setDescription(
        "Click the button below to request your profile picture!"
      );
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("profilepicbutton")
        .setEmoji("📸")
    );
    const channel = await client.channels.fetch(interaction.channelId);
    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed], components: [row] });
      interaction.followUp({ content: "Done!", ephemeral: true }).then((msg) =>
        setTimeout(() => {
          msg.channel.messages.fetch(msg.id).then((msg) => {
            msg.delete();
          });
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
