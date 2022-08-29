"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmbed = void 0;
const builders_1 = require("@discordjs/builders");
function ErrorEmbed(title, desc, error) {
    let embed = new builders_1.EmbedBuilder().setTitle(title).setColor(15548997).addFields({
        name: "❌ Error",
        value: desc,
    });
    return embed;
}
exports.ErrorEmbed = ErrorEmbed;
//# sourceMappingURL=Error.js.map