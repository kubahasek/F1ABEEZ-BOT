"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetChannel = void 0;
const discord_js_1 = require("discord.js");
const Client_1 = require("../prisma/Client");
exports.SetChannel = {
    name: "setchannel",
    description: "Sets channel id for different channels the bot uses",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "channelname",
            description: "Select which channel do you want to set up",
            choices: [
                { name: "Warnings Channel", value: "warningsChannel" },
                { name: "Incident Log channel", value: "reportLog" },
                { name: "Suggestion Log channel", value: "suggestionLog" },
                { name: "Leaving Channel", value: "leavingChannel" },
                { name: "Stewards Annoucements", value: "stewardsAnnoucements" },
                { name: "Welcome Channel", value: "welcomeChannel" },
            ],
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            name: "channel",
            description: "Select the channel you want to use",
            required: true,
        },
    ],
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.KickMembers,
    ephemeral: true,
    run: async (client, interaction) => {
        if (interaction.options.data[0].value &&
            interaction.options.data[1].channel?.id &&
            interaction.guild) {
            await Client_1.db.channels.upsert({
                where: {
                    channelName: interaction.options.data[0].value + interaction.guild.id,
                },
                update: { channelId: interaction.options.data[1].channel.id },
                create: {
                    channelName: interaction.options.data[0].value.toString() + interaction.guild.id,
                    channelId: interaction.options.data[1].channel.id,
                    serverId: interaction.guild.id,
                },
            });
            await interaction.followUp({
                content: `Set the ${interaction.options.data[0].value.toString()} to <#${interaction.options.data[1].channel.id}>`,
            });
        }
        else {
            await interaction.followUp({
                content: "There was an error. Please try again",
            });
        }
    },
};
//# sourceMappingURL=SetChannel.js.map