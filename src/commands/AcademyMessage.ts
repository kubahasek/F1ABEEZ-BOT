import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";
import GetRole from "../utils/GetRole";
import { log } from "../utils/Logger";
import { GetProfile } from "../utils/Notion";

export const AcademyMsg: Command = {
  name: "academymessage",
  description: "Sends the academy message!",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions:
    PermissionsBitField.Flags.Administrator |
    PermissionsBitField.Flags.KickMembers,
  options: [],
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      if (interaction.guildId) {
        const academyRole = await GetRole(
          client,
          "academyRole",
          interaction.guildId
        );
        const msg = await interaction.followUp({
          content: `<@&${academyRole?.id}>\n**TRIAL RACE BRIEFING:**\nWelcome to the F1ABEEZ trial race! I would just like to run through what is expected of you from your trial:\n- Please drive clean - we are a clean racing league, show respect to your fellow drivers! dirty driving will not be tolerated\n- Drive fast! It's still a race after all, we would like to see a true reflection of your pace\n- Do not use medium tyres in Qualifying for this trial race, as this lets us compare your quali pace!\n- Have fun! That's what we're all here for\n\nThe format is short qualifying, 25% race\nAfter the race is completed, one of the trialist leaders will DM you individually with their decision\nPlease react with a thumbs up once you have read this, good luck!`,
        });

        const channel = await client.channels.fetch(msg.channelId);
        if (channel && channel.isTextBased()) {
          const lastMsg = await channel.messages.fetch(msg.id);
          await lastMsg.react("👍");
        }
      } else {
        await interaction.followUp({
          content: "There was an error, please report this to the admins!",
        });
      }
    } catch (err) {
      log.error(err);
      await interaction.followUp({
        content: "There was an error, please report this to the admins!",
      });
    }
  },
};
