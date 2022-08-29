"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ButtonHandlers_1 = require("../ButtonHandlers");
const Commands_1 = require("../Commands");
const Error_1 = require("../utils/Error");
const Logger_1 = require("../utils/Logger");
exports.default = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isChatInputCommand() ||
            interaction.isContextMenuCommand()) {
            try {
                await handleSlashCommand(client, interaction);
            }
            catch (err) {
                const errEmbed = (0, Error_1.ErrorEmbed)("Error", `There was an error running your command ${interaction.commandName}`, err);
                if (interaction.replied) {
                    await interaction.followUp({ embeds: [errEmbed] });
                }
                else {
                    await interaction.followUp({ embeds: [errEmbed] });
                }
            }
        }
        else if (interaction.isButton()) {
            try {
                await handleButton(client, interaction);
            }
            catch (err) {
                const errEmbed = (0, Error_1.ErrorEmbed)("Error", `There was an error running your command ${interaction.customId}`, err);
                if (interaction.replied) {
                    await interaction.followUp({ embeds: [errEmbed] });
                }
                else {
                    await interaction.followUp({ embeds: [errEmbed] });
                }
            }
        }
        else if (interaction.isButton()) {
            await handleButton(client, interaction);
        }
    });
};
const handleSlashCommand = async (client, interaction) => {
    const slashCommand = Commands_1.Commands.find((c) => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.reply({
            content: "An error has occurred! Please report this to the admins",
        });
        Logger_1.log.error("An error has occured while handling a slash command");
        return;
    }
    await interaction.deferReply({ ephemeral: slashCommand.ephemeral });
    Logger_1.log.info(`Ran command ${slashCommand.name} for ${interaction.user.username}`);
    await slashCommand.run(client, interaction);
};
const handleButton = async (client, interaction) => {
    const buttonHandler = ButtonHandlers_1.buttonHandlers.find((c) => c.customId === interaction.customId);
    if (interaction.customId === "yes" || interaction.customId === "no") {
        await interaction.deferUpdate();
        return;
    }
    if (!buttonHandler) {
        await interaction.reply({
            content: "An error has occurred! Please report this to the admins",
        });
        Logger_1.log.error("An error has occured while handling a slash command");
        return;
    }
    await interaction.deferReply({ ephemeral: buttonHandler.ephemeral });
    Logger_1.log.info(`Ran button ${buttonHandler.name} for ${interaction.user.username}`);
    buttonHandler.run(client, interaction);
};
//# sourceMappingURL=interactionCreate.js.map