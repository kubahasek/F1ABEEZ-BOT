"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTicketsCommand = void 0;
const discord_js_1 = require("discord.js");
const Notion_1 = require("../utils/Notion");
const Logger_1 = require("../utils/Logger");
const Error_1 = require("../utils/Error");
exports.GetTicketsCommand = {
    name: "gettickets",
    description: "Gets you tickets associated with your gamertag.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "gamertag",
            description: "Put in your gamertag",
            required: true,
        },
    ],
    ephemeral: false,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value) {
            try {
                const tickets = await (0, Notion_1.GetTickets)(interaction.options.data[0].value.toString());
                await interaction.followUp({ embeds: [tickets] });
            }
            catch (err) {
                if (err instanceof Object) {
                    Logger_1.log.error(err);
                    const errEmbed = (0, Error_1.ErrorEmbed)(interaction.options.data[0].value.toString(), "There was en error getting the tickets for your profile. Read the gamertag and make sure it's correct. If you think this is a mistake, please contact the admins!", err);
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
//# sourceMappingURL=GetTickets.js.map