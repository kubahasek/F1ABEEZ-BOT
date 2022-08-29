"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TierMenu = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.TierMenu = new discord_js_1.ActionRowBuilder().addComponents(new builders_1.SelectMenuBuilder()
    .setCustomId("tierMenu")
    .setPlaceholder("Select a tier!")
    .addOptions({
    label: "Tier 1",
    value: "Tier 1",
}, {
    label: "Tier 2",
    value: "Tier 2",
}, {
    label: "Tier 3",
    value: "Tier 3",
}, {
    label: "Tier H",
    value: "Tier H",
}, {
    label: "Tier M",
    value: "Tier M",
}));
//# sourceMappingURL=TierMenu.js.map