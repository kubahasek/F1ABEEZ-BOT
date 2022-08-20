import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} from "discord.js";
import { Command } from "../types/Command";
import { db } from "../prisma/Client";

export const SetChannel: Command = {
  name: "setchannel",
  description: "Sets channel id for different channels the bot uses",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "channelname",
      description: "Select which channel do you want to set up",
      choices: [
        { name: "Warnings Channel", value: "warningsChannel" },
        { name: "Incident Log channel", value: "reportLog" },
        { name: "Suggestion Log channel", value: "suggestionLog" },
        { name: "Leaving Channel", value: "leavingChannel" },
      ],
      required: true,
    },
    {
      type: ApplicationCommandOptionType.Channel,
      name: "channel",
      description: "Select the channel you want to use",
      required: true,
    },
  ],
  defaultMemberPermissions: [
    PermissionFlagsBits.Administrator,
    PermissionFlagsBits.ManageGuild,
  ],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (
      interaction.options.data[0].value &&
      interaction.options.data[1].channel?.id &&
      interaction.guild
    ) {
      await db.channels.upsert({
        where: {
          channelName: interaction.options.data[0].value + interaction.guild.id,
        },
        update: { channelId: interaction.options.data[1].channel.id },
        create: {
          channelName:
            interaction.options.data[0].value.toString() + interaction.guild.id,
          channelId: interaction.options.data[1].channel.id,
          serverId: interaction.guild.id,
        },
      });
      await interaction.followUp({
        content: `Set the ${interaction.options.data[0].value.toString()} to <#${
          interaction.options.data[1].channel.id
        }>`,
      });
    } else {
      await interaction.followUp({
        content: "There was an error. Please try again",
      });
    }
  },
};
