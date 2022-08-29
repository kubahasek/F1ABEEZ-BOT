"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warn = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Client_1 = require("../prisma/Client");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
const Logger_1 = require("../utils/Logger");
exports.Warn = {
    name: "warn",
    description: "Warns the member",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.User,
            name: "user",
            description: "User to warn",
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "reason",
            description: "Reason for warning the user",
            required: true,
        },
    ],
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    ephemeral: false,
    run: async (client, interaction) => {
        const user = interaction.options.data[0].user;
        const reason = interaction.options.data[1].value;
        if (user && reason && interaction.guildId) {
            const embed = new discord_js_1.EmbedBuilder().setColor(16236412);
            const warnings = await Client_1.db.warnings.findMany({
                where: { userId: user.id },
            });
            try {
                if (warnings.length === 1) {
                    await interaction.guild?.members.ban(user);
                    embed
                        .setTitle("Ban")
                        .addFields({ name: "Ban", value: user.username }, {
                        name: "Reason",
                        value: "This was the member's second and last warning",
                    })
                        .setDescription("Ban");
                    await Client_1.db.warnings.deleteMany({
                        where: { userId: { equals: user.id } },
                    });
                    await interaction.followUp({ embeds: [embed] });
                    let warningsChannel = await (0, GetChannel_1.default)(client, "warningsChannel", interaction.guildId);
                    if (warningsChannel && warningsChannel.isTextBased()) {
                        warningsChannel = warningsChannel;
                        await warningsChannel.send({ embeds: [embed] });
                    }
                    else {
                        await interaction.followUp({
                            content: "Cound not find warnings channel",
                        });
                    }
                    return;
                }
            }
            catch (err) {
                await interaction.followUp({
                    content: `There was an error while running this command: ${err}. Please screenshot this and report this to the Admins. Thank you!`,
                });
                Logger_1.log.error(err);
                return;
            }
            await Client_1.db.warnings.create({
                data: {
                    userId: user.id,
                    Reason: reason.toString(),
                    serverId: interaction.guildId,
                },
            });
            embed
                .setTitle("Warning")
                .addFields({ name: "User warned", value: user.username }, { name: "Reason", value: reason.toString() });
            let warningsChannel = await (0, GetChannel_1.default)(client, "warningsChannel", interaction.guildId);
            if (warningsChannel && warningsChannel.isTextBased()) {
                warningsChannel = warningsChannel;
                await warningsChannel.send({ embeds: [embed] });
            }
            else {
                await interaction.followUp({
                    content: "Cound not find warnings channel. Please report this to the Admins.",
                });
            }
            await interaction.followUp({ embeds: [embed] });
        }
    },
};
//# sourceMappingURL=Warn.js.map