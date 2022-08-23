import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} from "discord.js";
import { Command } from "../types/Command";
import GetRole from "../utils/GetRole";
import { log } from "../utils/Logger";

export const Ready: Command = {
  name: "ready",
  description: "Sends the ready up message to tier drivers",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "tier",
      description: "Select the tier you want!",
      choices: [
        { name: "Tier 1", value: "tier1" },
        { name: "Tier 2", value: "tier2" },
        { name: "Tier 3", value: "tier3" },
        { name: "Tier M", value: "tierM" },
        { name: "Tier H", value: "tierH" },
      ],
      required: true,
    },
  ],
  defaultMemberPermissions:
    PermissionFlagsBits.Administrator | PermissionFlagsBits.KickMembers,
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (
      interaction.options.data[0].value &&
      interaction.guild?.id &&
      interaction.options.data[0].value
    ) {
      try {
        const tierRole = await GetRole(
          client,
          interaction.options.data[0].value.toString(),
          interaction.guild.id
        );
        const tierresRole = await GetRole(
          client,
          interaction.options.data[0].value.toString() + "res",
          interaction.guild.id
        );
        if (tierRole && tierresRole) {
          await interaction.followUp({
            content: `<@&${tierRole.id}> <@&${tierresRole.id}>\n**Ready Up!**/n/n`,
          });
        }
      } catch (err) {
        log.error(err);
      }
    }
  },
};
