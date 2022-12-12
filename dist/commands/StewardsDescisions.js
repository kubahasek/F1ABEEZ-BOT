"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StewardsDescisions = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Error_1 = require("../utils/Error");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
exports.StewardsDescisions = {
    name: "stewardsdescisions",
    description: "Sends the stewards decisions message!",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "type",
            description: "Select the type of message you want",
            choices: [
                { name: "F1ABEEZ", value: "1" },
                { name: "F2ABEEZ", value: "2" },
            ],
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Number,
            name: "round",
            description: "Enter the round number",
            required: true,
        },
    ],
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    ephemeral: false,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value &&
            interaction.options.data[1].value &&
            interaction.guild) {
            const val = interaction.options.data[0].value;
            const round = interaction.options.data[1].value;
            switch (val) {
                case "1":
                    try {
                        const channel = await (0, GetChannel_1.default)(client, "stewardsAnnoucements", interaction.guild.id);
                        const tier1URL = `<https://f1abeez.com/race-reports/t1/r${round}>`;
                        const tier2URL = `<https://f1abeez.com/race-reports/t2/r${round}>`;
                        const bansURL = `https://www.f1abeez.com/bans-of-the-week`;
                        if (channel && channel.isTextBased()) {
                            await channel.send({
                                content: `🦺 @everyone\n\n**All Stewards decisions are finalised**\nPlease check this week's race-report for all the incidents reported and decisions made.\n\n**F1 - Tier 1** - ${tier1URL}\n**F1 - Tier 2** - ${tier2URL}\n**Bans Issued for next round: **${bansURL}\n\nPlease file your appeals with the correct case number **in the next 24 hours**, and standings will be posted after all appeals are finalised \nFollow the instructions in <#864999507238322186> to submit your appeals \n\nThank you,\nStewards of F1ABEEZ`,
                            });
                            await interaction.followUp({
                                content: `Message sent in <#${channel.id}>`,
                            });
                        }
                    }
                    catch (err) {
                        const errorEmb = (0, Error_1.ErrorEmbed)("Stewards Announcement", "There was an error sending the announcement", err);
                        await interaction.followUp({ embeds: [errorEmb] });
                    }
                    break;
                case "2":
                    try {
                        const channel = await (0, GetChannel_1.default)(client, "stewardsAnnoucements", interaction.guild.id);
                        const tier1URL = `<https://f1abeez.com/race-reports/t1/${round}>`;
                        const tier2URL = `<https://f1abeez.com/race-reports/t2/${round}>`;
                        const tier3URL = `<https://f1abeez.com/race-reports/t3/${round}>`;
                        const tierHURL = `<https://f1abeez.com/race-reports/th/${round}>`;
                        const tierMURL = `<https://f1abeez.com/race-reports/tm/${round}>`;
                        const f2Tier1URL = `<https://f1abeez.com/race-reports/f2/t1/${round}>`;
                        const f2Tier2URL = `<https://f1abeez.com/race-reports/f2/t2/${round}>`;
                        const bansURL = `<https://www.f1abeez.com/bans-of-the-week>`;
                        if (channel && channel.isTextBased()) {
                            await channel.send(`🦺 @everyone\n\n**All Stewards decisions are finalised**\nPlease check this week's race-report for all the incidents reported and decisions made.\n\n**F2 - Tier 1** - ${f2Tier1URL}\n**F2 - Tier 2** - ${f2Tier2URL}\n\nThank You,\nStewards of F2ABEEZ.`);
                            await interaction.followUp({
                                content: `Message sent in <#${channel.id}>`,
                            });
                        }
                    }
                    catch (err) {
                        const errorEmb = (0, Error_1.ErrorEmbed)("Stewards Announcement", "There was an error sending the announcement", err);
                        await interaction.followUp({ embeds: [errorEmb] });
                    }
                    break;
                default:
                    break;
            }
        }
    },
};
//# sourceMappingURL=StewardsDescisions.js.map