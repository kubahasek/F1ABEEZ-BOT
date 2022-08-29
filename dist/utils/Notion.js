"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitAppeal = exports.SubmitIncident = exports.GetTicket = exports.GetTickets = exports.GetAppeals = exports.GetProfile = void 0;
const tslib_1 = require("tslib");
const builders_1 = require("@discordjs/builders");
const client_1 = require("@notionhq/client");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
let notion;
if (process.env.NOTION_TOKEN) {
    notion = new client_1.Client({ auth: process.env.NOTION_TOKEN });
}
else {
    throw new Error("Notion token not found");
}
async function GetProfile(gamertag) {
    try {
        if (process.env.profileDatabaseID) {
            const response = (await notion.databases.query({
                database_id: process.env.profileDatabaseID,
                filter: {
                    property: "Gamertag",
                    title: { equals: gamertag },
                },
            }));
            if (response.results.length > 0) {
                let embed = new builders_1.EmbedBuilder().setTitle(gamertag).setColor(16236412);
                let points = (await notion.pages.properties.retrieve({
                    page_id: response.results[0].id,
                    property_id: response.results[0].properties["RU:Current F1 Points"].id,
                }));
                let tier = (await notion.pages.properties.retrieve({
                    page_id: response.results[0].id,
                    property_id: response.results[0].properties["Current F1 Tier"].id,
                }));
                let penaltyPoints = (await notion.pages.properties.retrieve({
                    page_id: response.results[0].id,
                    property_id: response.results[0].properties["Penalty Points"].id,
                }));
                let team = (await notion.pages.properties.retrieve({
                    page_id: response.results[0].id,
                    property_id: response.results[0].properties["Team"].id,
                }));
                points = parseInt(points.property_item.rollup.number);
                tier = tier.multi_select[0].name;
                try {
                    team = (await notion.pages.properties.retrieve({
                        page_id: team.results[0].relation.id,
                        property_id: "title",
                    }));
                    team = team.results[0].title.plain_text;
                    embed.addFields({ name: "Team", value: team });
                }
                catch {
                    let team = (await notion.pages.properties.retrieve({
                        page_id: response.results[0].id,
                        property_id: response.results[0].properties["Reserve Team"].id,
                    }));
                    team = (await notion.pages.properties.retrieve({
                        page_id: team.results[0].relation.id,
                        property_id: "title",
                    }));
                    team = team.results[0].title.plain_text;
                    embed.addFields({ name: "Team", value: team });
                }
                penaltyPoints = parseInt(penaltyPoints.property_item.rollup.number);
                embed.addFields({ name: "Tier", value: tier }, { name: "F1 Points", value: points.toString() }, { name: "Penalty Points", value: penaltyPoints.toString() });
                return embed;
            }
            else {
                throw new Error("Profile not found");
            }
        }
        else {
            throw new Error("Profile database ID not found in environment variables");
        }
    }
    catch (err) {
        throw new Error("An error occured " + err);
    }
}
exports.GetProfile = GetProfile;
async function GetAppeals(gamertag) {
    try {
        if (process.env.appealsDatabaseId) {
            const response = await notion.databases.query({
                database_id: process.env.appealsDatabaseId,
                filter: {
                    or: [
                        {
                            property: "Appealed By",
                            rich_text: { contains: gamertag },
                        },
                        {
                            property: "GamerTag(s) involved",
                            rich_text: {
                                contains: gamertag,
                            },
                        },
                    ],
                },
            });
            let embed = new builders_1.EmbedBuilder()
                .setTitle(gamertag + "'s appeals")
                .setColor(16236412);
            let fields = new Array();
            if (response.results.length > 0) {
                const appeals = response.results;
                await Promise.all(appeals.map(async (a) => {
                    await Promise.allSettled([
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["Status"].id,
                        }),
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["GamerTag(s) involved"].id,
                        }),
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["AP-Case Number"].id,
                        }),
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["Appealed By"].id,
                        }),
                    ]).then((results) => {
                        if (results[0].status === "fulfilled" &&
                            results[1].status === "fulfilled" &&
                            results[2].status === "fulfilled" &&
                            results[3].status === "fulfilled") {
                            let status = results[0].value.select.name;
                            let driversInvolved = results[1].value.results[0].rich_text.plain_text;
                            let caseNumber = results[2].value.results.length > 0
                                ? results[2].value.results[0].title.plain_text
                                : "Appeal number not assigned";
                            let appealedBy = results[3].value.results[0].rich_text.plain_text;
                            let url = `[LINK](https://f1abeez.com/${a.url.substring(22)})`;
                            fields.push({
                                name: `${caseNumber} - ${status}`,
                                value: `${appealedBy} vs ${driversInvolved} ${url}`,
                            });
                        }
                    });
                })).then(() => {
                    embed.addFields(fields);
                    return embed;
                });
                return embed;
            }
            else {
                embed.addFields({
                    name: "None",
                    value: "No appeals were found for this gamertag",
                });
                return embed;
            }
        }
        else {
            throw new Error("Profile database ID not found in environment variables");
        }
    }
    catch (err) {
        throw new Error("An error occured" + err);
    }
}
exports.GetAppeals = GetAppeals;
async function GetTickets(gamertag) {
    try {
        if (process.env.incidentDatabaseId) {
            const response = await notion.databases.query({
                database_id: process.env.incidentDatabaseId,
                filter: {
                    or: [
                        {
                            property: "Reported By",
                            rich_text: { contains: gamertag },
                        },
                        {
                            property: "GamerTag(s) of Driver(s) involved incident (N/A for penalties)",
                            rich_text: {
                                contains: gamertag,
                            },
                        },
                    ],
                },
                sorts: [
                    {
                        property: "Case Number",
                        direction: "ascending",
                    },
                ],
            });
            let embed = new builders_1.EmbedBuilder()
                .setTitle(gamertag + "'s tickets")
                .setColor(16236412);
            let fields = new Array();
            if (response.results.length > 0) {
                const tickets = response.results;
                await Promise.all(tickets.map(async (a) => {
                    await Promise.allSettled([
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["Status"].id,
                        }),
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["GamerTag(s) of Driver(s) involved incident (N/A for penalties)"].id,
                        }),
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["Case Number"].id,
                        }),
                        notion.pages.properties.retrieve({
                            page_id: a.id,
                            property_id: a.properties["Reported By"].id,
                        }),
                    ]).then((results) => {
                        if (results[0].status === "fulfilled" &&
                            results[1].status === "fulfilled" &&
                            results[2].status === "fulfilled" &&
                            results[3].status === "fulfilled") {
                            let status = results[0].value.select.name;
                            let driversInvolved = results[1].value.results[0].rich_text.plain_text;
                            let caseNumber = results[2].value.results.length > 0
                                ? results[2].value.results[0].title.plain_text
                                : "Case Number not assigned";
                            let reportedBy = results[3].value.results[0].rich_text.plain_text;
                            let url = `[LINK](https://f1abeez.com/${a.url.substring(22)})`;
                            fields.push({
                                name: `${caseNumber} - ${status}`,
                                value: `${reportedBy} vs ${driversInvolved} ${url}`,
                            });
                        }
                    });
                })).then(() => {
                    embed.addFields(fields);
                    return embed;
                });
                return embed;
            }
            else {
                embed.addFields({
                    name: "None",
                    value: "No appeals were found for this gamertag",
                });
                return embed;
            }
        }
        else {
            throw new Error("Profile database ID not found in environment variables");
        }
    }
    catch (err) {
        throw new Error("An error occured" + err);
    }
}
exports.GetTickets = GetTickets;
async function GetTicket(ticketId) {
    try {
        if (process.env.incidentDatabaseId) {
            const response = (await notion.databases.query({
                database_id: process.env.incidentDatabaseId,
                filter: {
                    property: "Case Number",
                    title: {
                        contains: ticketId,
                    },
                },
            }));
            let embed = new builders_1.EmbedBuilder()
                .setTitle("Ticket no. " + ticketId)
                .setColor(16236412);
            if (response.results.length > 0) {
                const result = response.results[0];
                let status = (await notion.pages.properties.retrieve({
                    page_id: result.id,
                    property_id: result.properties["Status"].id,
                }));
                let driversInvolved = (await notion.pages.properties.retrieve({
                    page_id: result.id,
                    property_id: result.properties["GamerTag(s) of Driver(s) involved incident (N/A for penalties)"].id,
                }));
                let description = (await notion.pages.properties.retrieve({
                    page_id: result.id,
                    property_id: result.properties["Description"].id,
                }));
                let actionTaken = (await notion.pages.properties.retrieve({
                    page_id: result.id,
                    property_id: result.properties["Action(s) Taken"].id,
                }));
                let reportedBy = (await notion.pages.properties.retrieve({
                    page_id: result.id,
                    property_id: result.properties["Reported By"].id,
                }));
                status = status.select.name;
                driversInvolved = driversInvolved.results[0].rich_text.plain_text;
                reportedBy = reportedBy.results[0].rich_text.plain_text;
                description = description.results[0].rich_text.plain_text;
                actionTaken =
                    actionTaken.results.length > 0
                        ? actionTaken.results[0].rich_text.plain_text
                        : "undefined";
                let url = `https://f1abeez.com/${result.url.substring(22)}`;
                embed.addFields({ name: "Status", value: status }, { name: "Ticket Number", value: ticketId, inline: true }, {
                    name: "Drivers Involved",
                    value: `${reportedBy} vs ${driversInvolved}`,
                    inline: true,
                }, { name: "Description", value: description }, { name: "Action taken", value: actionTaken });
                embed.setURL(url);
                return embed;
            }
            else {
                embed.addFields({
                    name: "None",
                    value: "No ticket for this number was found",
                });
                return embed;
            }
        }
        else {
            throw new Error("Incident database ID not found in environment variables");
        }
    }
    catch (err) {
        throw new Error("An error occured" + err);
    }
}
exports.GetTicket = GetTicket;
async function SubmitIncident(incident) {
    if (process.env.incidentDatabaseId) {
        const response = await notion.pages.create({
            parent: {
                type: "database_id",
                database_id: process.env.incidentDatabaseId,
            },
            properties: {
                Description: {
                    rich_text: [
                        {
                            text: {
                                content: incident.description,
                            },
                        },
                    ],
                },
                Status: {
                    select: {
                        name: "In Progress",
                        color: "red",
                    },
                },
                "Tier/Division": {
                    select: {
                        name: incident.tier,
                    },
                },
                "Video Evidence (other video sources are allowed)": {
                    rich_text: [
                        {
                            text: {
                                content: incident.evidence,
                            },
                        },
                    ],
                },
                "Lap of incident/penalty": {
                    rich_text: [
                        {
                            text: {
                                content: incident.lap,
                            },
                        },
                    ],
                },
                "Reported By": {
                    rich_text: [
                        {
                            text: {
                                content: incident.gamertag,
                            },
                        },
                    ],
                },
                "GamerTag(s) of Driver(s) involved incident (N/A for penalties)": {
                    rich_text: [
                        {
                            text: {
                                content: incident.involvedDriver,
                            },
                        },
                    ],
                },
                "Time Reported": {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
                "Submitted through": {
                    select: {
                        name: "F1ABEEZ Bot",
                        color: "pink",
                    },
                },
            },
        });
        if (response.id) {
            return new builders_1.EmbedBuilder()
                .setColor(16236412)
                .setTitle("Success")
                .addFields({
                name: "✅",
                value: "Your ticket has been succesfully submitted!",
            });
        }
        else {
            return new builders_1.EmbedBuilder().setColor(16236412).setTitle("Error").addFields({
                name: "❌",
                value: "There's been an error submitting your ticket! Please report this to the admins.",
            });
        }
    }
    else {
        throw new Error("Incident Database ID not found in env vars");
    }
}
exports.SubmitIncident = SubmitIncident;
async function SubmitAppeal(appeal) {
    if (process.env.appealsDatabaseId) {
        const response = await notion.pages.create({
            parent: {
                type: "database_id",
                database_id: process.env.appealsDatabaseId,
            },
            properties: {
                "Case Number": {
                    rich_text: [
                        {
                            text: {
                                content: appeal.caseNumber,
                            },
                        },
                    ],
                },
                Status: {
                    select: {
                        name: "In Progress",
                        color: "pink",
                    },
                },
                "Additional Evidence": {
                    rich_text: [
                        {
                            text: {
                                content: appeal.evidence,
                            },
                        },
                    ],
                },
                "Appealed By": {
                    rich_text: [
                        {
                            text: {
                                content: appeal.gamertag,
                            },
                        },
                    ],
                },
                Reason: {
                    rich_text: [
                        {
                            text: {
                                content: appeal.reason,
                            },
                        },
                    ],
                },
                "GamerTag(s) involved": {
                    rich_text: [
                        {
                            text: {
                                content: appeal.involvedDriver,
                            },
                        },
                    ],
                },
                "Additional Info": {
                    rich_text: [
                        {
                            text: {
                                content: appeal.additionalInfo,
                            },
                        },
                    ],
                },
                "Time Reported": {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
                "Submitted Through": {
                    select: {
                        name: "F1ABEEZ Bot",
                        color: "pink",
                    },
                },
            },
        });
        if (response.id) {
            return new builders_1.EmbedBuilder()
                .setColor(16236412)
                .setTitle("Success")
                .addFields({
                name: "✅",
                value: "Your appeal has been succesfully submitted!",
            });
        }
        else {
            return new builders_1.EmbedBuilder().setColor(16236412).setTitle("Error").addFields({
                name: "❌",
                value: "There's been an error submitting your appeal! Please report this to the admins.",
            });
        }
    }
    else {
        throw new Error("Appeal Database ID not found in env vars");
    }
}
exports.SubmitAppeal = SubmitAppeal;
//# sourceMappingURL=Notion.js.map