"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealReportButtonHandler = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Notion_1 = require("../utils/Notion");
const Error_1 = require("../utils/Error");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
const Logger_1 = require("../utils/Logger");
const messages = {
    caseNumber: {
        question: "What is the case number?",
    },
    gamertag: {
        question: "What is your gamertag?",
    },
    reason: {
        question: "Please state the reason for your appeal",
    },
    additionalInfo: {
        question: "Please provide any additional information to support your appeal! (If you don't have any reply with N/A.)",
    },
    evidence: {
        question: "Please provide additional evidence to support your reply! (Only reply with links to gamerdvr or other services.)",
    },
    involvedDriver: {
        question: "What is the gamertag(s) of the driver(s) involved? (For penalties reply with N/A.)",
    },
};
exports.AppealReportButtonHandler = {
    name: "appealReport",
    customId: "appealreportbutton",
    ephemeral: true,
    run: async (client, interaction) => {
        await interaction.followUp({
            content: `Please follow the bot to your DMs to submit your appeal! <@${interaction.user.id}>`,
        });
        const filter = (m) => m.author.id === interaction.user.id;
        const componentFilter = (i) => {
            i.deferUpdate();
            return i.user.id === interaction.user.id;
        };
        const user = interaction.user;
        const userDM = await user.createDM();
        const appeal = {
            caseNumber: "",
            gamertag: "",
            reason: "",
            additionalInfo: "",
            evidence: "",
            involvedDriver: "",
        };
        userDM.send({ content: messages.caseNumber.question }).then(() => {
            userDM
                .awaitMessages({ filter: filter, max: 1, maxProcessed: 1, time: 60000 })
                .then((collected) => {
                let value = collected.first()?.content;
                if (value) {
                    appeal.caseNumber = value;
                }
                userDM.send({ content: messages.gamertag.question }).then(() => {
                    userDM
                        .awaitMessages({
                        filter: filter,
                        max: 1,
                        maxProcessed: 1,
                        time: 60000,
                    })
                        .then((collected) => {
                        let value = collected.first()?.content;
                        if (value) {
                            appeal.gamertag = value;
                        }
                        userDM.send({ content: messages.reason.question }).then(() => {
                            userDM
                                .awaitMessages({
                                filter: filter,
                                max: 1,
                                maxProcessed: 1,
                                time: 60000,
                            })
                                .then((collected) => {
                                let value = collected.first()?.content;
                                if (value) {
                                    appeal.reason = value;
                                }
                                userDM
                                    .send({ content: messages.additionalInfo.question })
                                    .then(() => {
                                    userDM
                                        .awaitMessages({
                                        filter: filter,
                                        max: 1,
                                        maxProcessed: 1,
                                        time: 60000,
                                    })
                                        .then((collected) => {
                                        let value = collected.first()?.content;
                                        if (value) {
                                            appeal.additionalInfo = value;
                                        }
                                        userDM
                                            .send({ content: messages.evidence.question })
                                            .then(() => {
                                            userDM
                                                .awaitMessages({
                                                filter: filter,
                                                max: 1,
                                                maxProcessed: 1,
                                                time: 60000,
                                            })
                                                .then((collected) => {
                                                let value = collected.first()?.content;
                                                if (value) {
                                                    appeal.evidence = value;
                                                }
                                                userDM
                                                    .send({
                                                    content: messages.involvedDriver.question,
                                                })
                                                    .then(() => {
                                                    userDM
                                                        .awaitMessages({
                                                        filter: filter,
                                                        max: 1,
                                                        maxProcessed: 1,
                                                        time: 60000,
                                                    })
                                                        .then((collected) => {
                                                        let value = collected.first()?.content;
                                                        if (value) {
                                                            appeal.involvedDriver = value;
                                                        }
                                                        try {
                                                            (0, Notion_1.SubmitAppeal)(appeal).then((res) => {
                                                                userDM.send({
                                                                    embeds: [res],
                                                                });
                                                            });
                                                            const reportEmbed = new discord_js_1.EmbedBuilder()
                                                                .setColor(16236412)
                                                                .setTitle("⚠️ A new appeal has been submitted! ⚠")
                                                                .addFields({
                                                                name: "Case Number",
                                                                value: appeal.caseNumber,
                                                            }, {
                                                                name: "Drivers Involved",
                                                                value: `${appeal.gamertag} vs ${appeal.involvedDriver}`,
                                                            });
                                                            if (interaction.guildId)
                                                                try {
                                                                    const logChannel = (0, GetChannel_1.default)(client, "reportLog", interaction.guildId).then((channel) => {
                                                                        if (channel?.isTextBased()) {
                                                                            channel.send({
                                                                                embeds: [
                                                                                    reportEmbed,
                                                                                ],
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                                catch (err) {
                                                                    Logger_1.log.error(err);
                                                                }
                                                        }
                                                        catch (err) {
                                                            const embed = (0, Error_1.ErrorEmbed)("Appeal Report", "There's been an error submmitting your appeal. Please report this to the admins", err);
                                                            userDM.send({
                                                                embeds: [embed],
                                                            });
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
};
//# sourceMappingURL=AppealReport.js.map