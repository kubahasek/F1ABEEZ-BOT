"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionMenu = void 0;
const discord_js_1 = require("discord.js");
exports.SuggestionMenu = {
    name: "suggestionmenu",
    description: "Sends the suggestion menu",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [],
    ephemeral: false,
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    run: async (client, interaction) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(16236412)
            .setTitle("Submit a suggestion")
            .setDescription("Click the button below to submit a suggestion!");
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setCustomId("suggestionbutton")
            .setEmoji("📩"));
        const channel = await client.channels.fetch(interaction.channelId);
        if (channel && channel.isTextBased()) {
            await channel.send({ embeds: [embed], components: [row] });
            interaction.followUp({ content: "Done!", ephemeral: true }).then((msg) => setTimeout(() => {
                msg.delete();
            }, 10000));
        }
        else {
            await interaction.followUp({
                content: "Could not send the menu in here, report this to the admins!",
                ephemeral: true,
            });
        }
    },
};
//# sourceMappingURL=SuggestionMenu.js.map