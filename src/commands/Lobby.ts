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
import GetTierLead from "../utils/GetTierLead";
import { log } from "../utils/Logger";

export const Lobby: Command = {
  name: "lobby",
  description: "Sends the lobby is open message.",
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
        const lobbyHost = await GetTierLead(
          client,
          interaction.options.data[0].value.toString(),
          interaction.guild.id
        );
        if (tierRole && tierresRole && lobbyHost) {
          await interaction.followUp({
            content: `<@&${tierRole.id}> <@&${tierresRole.id}>\n**Lobby is now open!**\nPlease join off <@${lobbyHost.user.id}>\nGamertag is - ${lobbyHost.gamertag}\nPlease put a message in this chat if you need an invite.\nIf you have a qualifying ban, make sure to serve it!\nWhile waiting why not check out our website - F1ABEEZ.com`,
          });
        }
      } catch (err) {
        log.error(err as Error);
      }
    }
  },
};
