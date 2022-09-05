"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentReportButtonHandler = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const TierMenu_1 = require("../selectMenus/TierMenu");
const Notion_1 = require("../utils/Notion");
const Error_1 = require("../utils/Error");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
const Logger_1 = require("../utils/Logger");
const messages = {
    gamertag: {
        question: "What is your gamertag?",
    },
    description: {
        question: "Please describe your incident!",
    },
    tier: {
        question: "What is your tier?",
    },
    evidence: {
        question: "Please provide video evidence! (only reply with links to a video)",
    },
    driversInvolved: {
        question: "What is the gamertag(s) of the driver(s) involved? (For penalties, reply with N/A)",
    },
    lap: {
        question: "What lap did this incident occur on?",
    },
};
exports.IncidentReportButtonHandler = {
    name: "incidentReport",
    customId: "incidentreportbutton",
    ephemeral: true,
    run: async (client, interaction) => {
        await interaction.followUp({
            content: `Please follow the bot to your DMs to submit your incident! <@${interaction.user.id}>`,
        });
        const filter = (m) => m.author.id === interaction.user.id;
        const componentFilter = (i) => {
            i.deferUpdate();
            return i.user.id === interaction.user.id;
        };
        const user = interaction.user;
        const userDM = await user.createDM();
        const incident = {
            gamertag: "",
            lap: "",
            involvedDriver: "",
            evidence: "",
            description: "",
            tier: "",
        };
        userDM.send({ content: messages.gamertag.question }).then(() => {
            userDM
                .awaitMessages({ filter: filter, max: 1, maxProcessed: 1, time: 60000 })
                .then((collected) => {
                let value = collected.first()?.content;
                if (value) {
                    incident.gamertag = value;
                }
                userDM.send({ content: messages.description.question }).then(() => {
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
                            incident.description = value;
                        }
                        userDM
                            .send({ content: messages.driversInvolved.question })
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
                                    incident.involvedDriver = value;
                                }
                                userDM
                                    .send({ content: messages.lap.question })
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
                                            incident.lap = value;
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
                                                    incident.evidence = value;
                                                }
                                                userDM
                                                    .send({
                                                    content: messages.tier.question,
                                                    components: [TierMenu_1.TierMenu],
                                                })
                                                    .then(() => {
                                                    userDM
                                                        .awaitMessageComponent({
                                                        filter: componentFilter,
                                                        time: 60000,
                                                        componentType: discord_js_1.ComponentType.SelectMenu,
                                                    })
                                                        .then((collected) => {
                                                        let value = collected.values[0];
                                                        if (value) {
                                                            incident.tier = value;
                                                        }
                                                        try {
                                                            (0, Notion_1.SubmitIncident)(incident).then((res) => {
                                                                userDM.send({
                                                                    embeds: [res],
                                                                });
                                                            });
                                                            const reportEmbed = new discord_js_1.EmbedBuilder()
                                                                .setColor(16236412)
                                                                .setTitle("⚠️ A new ticket has been reported! ⚠")
                                                                .addFields({
                                                                name: "Tier",
                                                                value: incident.tier,
                                                            }, {
                                                                name: "Drivers Involved",
                                                                value: `${incident.gamertag} vs ${incident.involvedDriver}`,
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
                                                                    Logger_1.log.error(err, incident);
                                                                }
                                                        }
                                                        catch (err) {
                                                            const embed = (0, Error_1.ErrorEmbed)("Incident Reports", "There's been an error submmitting your incident. Please report this to the admins", err);
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
//# sourceMappingURL=IncidentReport.js.map