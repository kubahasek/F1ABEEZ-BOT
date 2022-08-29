"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentReportMenu = void 0;
const discord_js_1 = require("discord.js");
exports.IncidentReportMenu = {
    name: "incidentmenu",
    description: "Sends the incident report menu",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    options: [],
    ephemeral: false,
    run: async (client, interaction) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(16236412)
            .setTitle("Report an incident")
            .setDescription("Click the button below to report an incident!");
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setCustomId("incidentreportbutton")
            .setEmoji("📩"));
        const channel = await client.channels.fetch(interaction.channelId);
        if (channel && channel.isTextBased()) {
            await channel.send({ embeds: [embed], components: [row] });
            interaction.followUp({ content: "Done!", ephemeral: true }).then((msg) => setTimeout(() => {
                msg.channel.messages.fetch(msg.id).then((msg) => msg.delete());
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
//# sourceMappingURL=IncidentReportMenu.js.map