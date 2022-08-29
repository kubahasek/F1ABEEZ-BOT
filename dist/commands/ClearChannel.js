"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearChannel = void 0;
const discord_js_1 = require("discord.js");
exports.ClearChannel = {
    name: "clearchannel",
    description: "clears the channel",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [],
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    ephemeral: false,
    run: async (client, interaction) => {
        let channel = interaction.channelId;
        const fetchedChannel = await client.channels.fetch(channel);
        if (fetchedChannel &&
            fetchedChannel.isTextBased() &&
            !fetchedChannel.isDMBased()) {
            await fetchedChannel.bulkDelete(100, true);
        }
    },
};
//# sourceMappingURL=ClearChannel.js.map