"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Logger_1 = require("../utils/Logger");
const Error_1 = require("../utils/Error");
const Figma = tslib_1.__importStar(require("figma-api"));
exports.Calendar = {
    name: "calendar",
    description: "Gets you the current calendar",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [],
    ephemeral: false,
    run: async (client, interaction) => {
        if (process.env.FIGMA_TOKEN) {
            try {
                const api = new Figma.Api({
                    personalAccessToken: process.env.FIGMA_TOKEN,
                });
                const image = await api.getImage("8mL0mwOKyIUcoLG3goL7wk", {
                    ids: "102:367",
                    scale: 1,
                    format: "png",
                });
                if (image.status) {
                    const errEmbed = (0, Error_1.ErrorEmbed)("Calendar", "There was an error getting the calendar.", new RangeError("Image not found"));
                    Logger_1.log.error("Image for calendar not found");
                    await interaction.followUp({ embeds: [errEmbed] });
                }
                const imgLink = image.images["102:367"];
                const embed = new discord_js_1.EmbedBuilder().setImage(imgLink).setColor(16236412);
                await interaction.followUp({ embeds: [embed] });
            }
            catch (err) {
                const errEmbed = (0, Error_1.ErrorEmbed)("Calendar", "There was an error getting the calendar.", err);
                Logger_1.log.error(err);
                await interaction.followUp({ embeds: [errEmbed] });
            }
        }
    },
};
//# sourceMappingURL=Calendar.js.map