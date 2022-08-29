"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const GetRole_1 = tslib_1.__importDefault(require("../utils/GetRole"));
const GetTierLead_1 = tslib_1.__importDefault(require("../utils/GetTierLead"));
const Logger_1 = require("../utils/Logger");
exports.Lobby = {
    name: "lobby",
    description: "Sends the lobby is open message.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
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
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    ephemeral: false,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value && interaction.guild?.id) {
            try {
                const tierRole = await (0, GetRole_1.default)(client, interaction.options.data[0].value.toString(), interaction.guild.id);
                const tierresRole = await (0, GetRole_1.default)(client, interaction.options.data[0].value.toString() + "res", interaction.guild.id);
                const lobbyHost = await (0, GetTierLead_1.default)(client, interaction.options.data[0].value.toString(), interaction.guild.id);
                if (tierRole && tierresRole && lobbyHost) {
                    await interaction.followUp({
                        content: `<@&${tierRole.id}> <@&${tierresRole.id}>\n**Lobby is now open!**\nPlease join off <@${lobbyHost.user.id}>\nGamertag is - ${lobbyHost.gamertag}\nPlease put a message in this chat if you need an invite.\nIf you have a qualifying ban, make sure to serve it!\nWhile waiting why not check out our website - F1ABEEZ.com`,
                    });
                }
            }
            catch (err) {
                Logger_1.log.error(err);
            }
        }
    },
};
//# sourceMappingURL=Lobby.js.map