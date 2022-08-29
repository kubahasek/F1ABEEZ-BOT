"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionButtonHandler = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
exports.SuggestionButtonHandler = {
    name: "suggestionbuttonhandler",
    customId: "suggestionbutton",
    ephemeral: true,
    run: async (client, interaction) => {
        await interaction.followUp({
            content: `Please follow the bot to your DMs to submit your suggestion! <@${interaction.user.id}>`,
        });
        const filter = (m) => m.author.id === interaction.user.id;
        const componentFilter = (i) => {
            return i.user.id === interaction.user.id;
        };
        const user = interaction.user;
        const userDM = await user.createDM();
        let suggestion;
        let anonymous;
        userDM
            .send({
            content: "Please type your suggestion here, the F1ABEEZ Team will have a look it as soon as possible! Thank you for contributing!",
        })
            .then(() => {
            userDM
                .awaitMessages({
                filter: filter,
                max: 1,
                maxProcessed: 1,
                time: 60000,
            })
                .then((msg) => {
                let message = msg.first()?.content;
                if (message) {
                    suggestion = message;
                }
                const anonymousMenu = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                    .setCustomId("yes")
                    .setLabel("Yes")
                    .setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
                    .setCustomId("no")
                    .setLabel("No")
                    .setStyle(discord_js_1.ButtonStyle.Danger));
                userDM
                    .send({
                    content: "Do you wish to stay anonymous?",
                    components: [anonymousMenu],
                })
                    .then(() => {
                    userDM
                        .awaitMessageComponent({
                        filter: componentFilter,
                        time: 60000,
                        componentType: discord_js_1.ComponentType.Button,
                    })
                        .then((btn) => {
                        if (interaction.guildId) {
                            (0, GetChannel_1.default)(client, "suggestionLog", interaction.guildId).then((channel) => {
                                if (channel?.isTextBased()) {
                                    const embed = btn.customId === "no"
                                        ? new discord_js_1.EmbedBuilder()
                                            .setTitle("🚨A new suggestion has been submitted🚨")
                                            .setColor(16236412)
                                            .addFields({
                                            name: "Submitted By:",
                                            value: interaction.user.tag,
                                        }, { name: "Suggestion:", value: suggestion })
                                        : new discord_js_1.EmbedBuilder()
                                            .setTitle("🚨A new suggestion has been submitted🚨")
                                            .setColor(16236412)
                                            .addFields({
                                            name: "Suggestion:",
                                            value: suggestion,
                                        });
                                    channel.send({ embeds: [embed] });
                                    userDM.send({
                                        content: "Your suggestion has been submitted to the F1ABEEZ Team. Thank you!",
                                    });
                                }
                            });
                        }
                    });
                });
            });
        });
    },
};
//# sourceMappingURL=SuggestionSubmission.js.map