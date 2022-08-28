import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextBasedChannel,
  TextChannel,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";
import { db } from "../prisma/Client";
import GetChannel from "../utils/GetChannel";
import { log } from "../utils/Logger";

export const Warn: Command = {
  name: "warn",
  description: "Warns the member",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      name: "user",
      description: "User to warn",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "reason",
      description: "Reason for warning the user",
      required: true,
    },
  ],
  defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.options.data[0].user;
    const reason = interaction.options.data[1].value;
    if (user && reason && interaction.guildId) {
      const embed = new EmbedBuilder().setColor(16236412);
      const warnings = await db.warnings.findMany({
        where: { userId: user.id },
      });
      try {
        if (warnings.length === 1) {
          await interaction.guild?.members.ban(user);
          embed
            .setTitle("Ban")
            .addFields(
              { name: "Ban", value: user.username },
              {
                name: "Reason",
                value: "This was the member's second and last warning",
              }
            )
            .setDescription("Ban");
          await db.warnings.deleteMany({
            where: { userId: { equals: user.id } },
          });
          await interaction.followUp({ embeds: [embed] });
          let warningsChannel = await GetChannel(
            client,
            "warningsChannel",
            interaction.guildId
          );
          if (warningsChannel && warningsChannel.isTextBased()) {
            warningsChannel = warningsChannel as TextChannel;
            await warningsChannel.send({ embeds: [embed] });
          } else {
            await interaction.followUp({
              content: "Cound not find warnings channel",
            });
          }
          return;
        }
      } catch (err) {
        await interaction.followUp({
          content: `There was an error while running this command: ${err}. Please screenshot this and report this to the Admins. Thank you!`,
        });
        log.error(err as Error);
        return;
      }
      await db.warnings.create({
        data: {
          userId: user.id,
          Reason: reason.toString(),
          serverId: interaction.guildId,
        },
      });
      embed
        .setTitle("Warning")
        .addFields(
          { name: "User warned", value: user.username },
          { name: "Reason", value: reason.toString() }
        );

      let warningsChannel = await GetChannel(
        client,
        "warningsChannel",
        interaction.guildId
      );
      if (warningsChannel && warningsChannel.isTextBased()) {
        warningsChannel = warningsChannel as TextBasedChannel;
        await warningsChannel.send({ embeds: [embed] });
      } else {
        await interaction.followUp({
          content:
            "Cound not find warnings channel. Please report this to the Admins.",
        });
      }

      await interaction.followUp({ embeds: [embed] });
    }
  },
};
