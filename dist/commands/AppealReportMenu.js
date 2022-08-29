"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealReportMenu = void 0;
const discord_js_1 = require("discord.js");
exports.AppealReportMenu = {
    name: "appealreportmenu",
    description: "Sends the appeal report menu",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [],
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    ephemeral: false,
    run: async (client, interaction) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(16236412)
            .setTitle("Submit an appeal")
            .setDescription("Click the button below to submit an appeal");
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setCustomId("appealreportbutton")
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
//# sourceMappingURL=AppealReportMenu.js.map