import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  Message,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";

export const ClearChannel: Command = {
  name: "clearchannel",
  description: "clears the channel",
  type: ApplicationCommandType.ChatInput,
  options: [],
  defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    let channel = interaction.channelId;
    const fetchedChannel = await client.channels.fetch(channel);
    if (
      fetchedChannel &&
      fetchedChannel.isTextBased() &&
      !fetchedChannel.isDMBased()
    ) {
      await fetchedChannel.bulkDelete(100, true);
    }
  },
};
