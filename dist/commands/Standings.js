"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standings = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Figma = tslib_1.__importStar(require("figma-api"));
const Error_1 = require("../utils/Error");
const Logger_1 = require("../utils/Logger");
exports.Standings = {
    name: "standings",
    description: "Gets you the standings graphics",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "tier",
            description: "Select the tier you want!",
            choices: [
                { name: "Tier 1", value: "2:16" },
                { name: "Tier 2", value: "406:667" },
                { name: "Tier 3", value: "4:265" },
                { name: "Tier M", value: "406:1251" },
                { name: "Tier H", value: "1002:2" },
                { name: "Team standings", value: "16:1142" },
            ],
            required: true,
        },
    ],
    ephemeral: false,
    run: async (client, interaction) => {
        if (process.env.FIGMA_TOKEN && interaction.options.data[0].value) {
            try {
                const api = new Figma.Api({
                    personalAccessToken: process.env.FIGMA_TOKEN,
                });
                const image = await api.getImage("d4sDj6FfYxdOszlQbdOhqu", {
                    ids: interaction.options.data[0].value.toString(),
                    scale: 1,
                    format: "png",
                });
                if (image.status) {
                    const errEmbed = (0, Error_1.ErrorEmbed)("Standings", "There was an error getting the standings.", new RangeError("Image not found"));
                    Logger_1.log.error("Image for standings not found" + interaction.options.data[0].name);
                    await interaction.followUp({ embeds: [errEmbed] });
                }
                const imgLink = image.images[interaction.options.data[0].value.toString()];
                const embed = new discord_js_1.EmbedBuilder().setImage(imgLink).setColor(16236412);
                await interaction.followUp({ embeds: [embed] });
            }
            catch (err) {
                const errEmbed = (0, Error_1.ErrorEmbed)("Standings", "There was an error getting the standings.", err);
                Logger_1.log.error(err);
                await interaction.followUp({ embeds: [errEmbed] });
            }
        }
    },
};
//# sourceMappingURL=Standings.js.map