"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTicketCommand = void 0;
const discord_js_1 = require("discord.js");
const Error_1 = require("../utils/Error");
const Notion_1 = require("../utils/Notion");
const Logger_1 = require("../utils/Logger");
exports.GetTicketCommand = {
    name: "ticketdetail",
    description: "Gets you the ticket detail",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "ticketno",
            description: "Enter the case number of the ticket you are looking for",
            required: true,
        },
    ],
    ephemeral: false,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value) {
            try {
                const ticket = await (0, Notion_1.GetTicket)(interaction.options.data[0].value.toString());
                await interaction.followUp({
                    embeds: [ticket],
                });
            }
            catch (err) {
                if (err instanceof Object) {
                    Logger_1.log.error(err);
                    const errEmbed = (0, Error_1.ErrorEmbed)(interaction.options.data[0].value.toString(), "There was en error getting the ticket you were looking for. Read the gamertag and make sure it's correct. If you think this is a mistake, please contact the admins!", err);
                    await interaction.followUp({
                        embeds: [errEmbed],
                    });
                }
                else {
                    Logger_1.log.error(err);
                    await interaction.followUp({
                        content: "There was an error. Please contact the admins and screenshot this message. Error: " +
                            String(err),
                    });
                }
            }
        }
    },
};
//# sourceMappingURL=TicketDetail.js.map