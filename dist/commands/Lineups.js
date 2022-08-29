"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lineups = void 0;
const discord_js_1 = require("discord.js");
exports.Lineups = {
    name: "lineups",
    description: "Responds with a link to the lineups!",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [],
    ephemeral: false,
    run: async (client, interaction) => {
        await interaction.followUp({
            content: "<https://www.f1abeez.com/line-ups>",
        });
    },
};
//# sourceMappingURL=Lineups.js.map