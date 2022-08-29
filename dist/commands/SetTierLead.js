"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTierLead = void 0;
const discord_js_1 = require("discord.js");
const Client_1 = require("../prisma/Client");
exports.SetTierLead = {
    name: "settierlead",
    description: "Sets up the tier lead",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "tier",
            description: "Select which  role do you want to set up.",
            choices: [
                { name: "Tier 1", value: "tier1" },
                { name: "Tier 2", value: "tier2" },
                { name: "Tier 3", value: "tier3" },
                { name: "Tier H", value: "tierH" },
                { name: "Tier M", value: "tierM" },
            ],
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.User,
            name: "user",
            description: "Select the user that is the tier lead",
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "gamertag",
            description: "Set the gamertag of the tier lead",
            required: true,
        },
    ],
    ephemeral: true,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value &&
            interaction.options.data[1].user &&
            interaction.options.data[2].value &&
            interaction.guild) {
            await Client_1.db.tierLeads.upsert({
                where: {
                    tierName: interaction.options.data[0].value.toString() + interaction.guild.id,
                },
                update: { userId: interaction.options.data[1].user.id },
                create: {
                    tierName: interaction.options.data[0].value.toString() + interaction.guild.id,
                    userId: interaction.options.data[1].user.id,
                    serverId: interaction.guild.id,
                    gamertag: interaction.options.data[2].value.toString(),
                },
            });
            await interaction.followUp({
                content: `Set ${interaction.options.data[0].value.toString()} to <@${interaction.options.data[1].user.id}>`,
            });
        }
        else {
            await interaction.followUp({
                content: "There was an error. Please try again.",
            });
        }
    },
};
//# sourceMappingURL=SetTierLead.js.map