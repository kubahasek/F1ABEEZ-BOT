import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";
import GetRole from "../utils/GetRole";
import { log } from "../utils/Logger";

export const Race: Command = {
  name: "race",
  description: "Sends the race ready up message to tier drivers",
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
  defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
  ephemeral: false,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.options.data[0].value && interaction.guild?.id) {
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
            content: `<@&${tierRole.id}> <@&${tierresRole.id}>\n**Ready up for the race start please!**\n\nGood luck out there everyone, see you after the race`,
          });
        }
      } catch (err) {
        log.error(err as Error);
      }
    }
  },
};
