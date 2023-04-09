"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePicRequestMenu = void 0;
const discord_js_1 = require("discord.js");
exports.ProfilePicRequestMenu = {
    name: "profilepicmenu",
    description: "Sends the menu for requesting profile pictures",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    options: [],
    ephemeral: false,
    run: async (client, interaction) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(16236412)
            .setTitle("Request a profile pic!")
            .setDescription("Click the button below to request your profile picture!");
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setCustomId("profilepicbutton")
            .setEmoji("📸"));
        const channel = await client.channels.fetch(interaction.channelId);
        if (channel && channel.isTextBased()) {
            await channel.send({ embeds: [embed], components: [row] });
            interaction.followUp({ content: "Done!", ephemeral: true }).then((msg) => setTimeout(() => {
                msg.channel.messages.fetch(msg.id).then((msg) => {
                    msg.delete();
                });
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
//# sourceMappingURL=ProfilePicRequestMenu.js.map