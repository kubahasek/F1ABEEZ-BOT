"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRole = void 0;
const discord_js_1 = require("discord.js");
const Client_1 = require("../prisma/Client");
exports.SetRole = {
    name: "setrole",
    description: "Allows to set differenr roles up",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "rolename",
            description: "Select which  role do you want to set up.",
            choices: [
                { name: "Academy Role", value: "academyRole" },
                { name: "Tier 1", value: "tier1" },
                { name: "Tier 1 Reserve", value: "tier1res" },
                { name: "Tier 2", value: "tier2" },
                { name: "Tier 2 Reserve", value: "tier2res" },
                { name: "Tier 3", value: "tier3" },
                { name: "Tier 3 Reserve", value: "tier3res" },
                { name: "Tier H", value: "tierH" },
                { name: "Tier H Reserve", value: "tierHres" },
                { name: "Tier M", value: "tierM" },
                { name: "Tier M Reserve", value: "tierMres" },
            ],
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Role,
            name: "role",
            description: "Select the role associated with the role name.",
            required: true,
        },
    ],
    ephemeral: true,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value &&
            interaction.options.data[1].role?.id &&
            interaction.guild) {
            await Client_1.db.roles.upsert({
                where: {
                    roleName: interaction.options.data[0].value + interaction.guild.id,
                },
                update: { roleId: interaction.options.data[1].role.id },
                create: {
                    roleName: interaction.options.data[0].value.toString() + interaction.guild.id,
                    roleId: interaction.options.data[1].role.id,
                    serverId: interaction.guild.id,
                },
            });
            await interaction.followUp({
                content: `Set ${interaction.options.data[0].value.toString()} to <@&${interaction.options.data[1].role.id}>`,
            });
        }
        else {
            await interaction.followUp({
                content: "There was an error. Please try again.",
            });
        }
    },
};
//# sourceMappingURL=SetRole.js.map