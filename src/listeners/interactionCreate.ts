import {
  CommandInteraction,
  Client,
  BaseInteraction,
  ButtonInteraction,
} from "discord.js";
import { buttonHandlers } from "../ButtonHandlers";
import { Commands } from "../Commands";
import { Error } from "../utils/Error";
import { log } from "../utils/Logger";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: BaseInteraction) => {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      try {
        await handleSlashCommand(client, interaction);
      } catch (err) {
        const errEmbed = Error(
          "Error",
          `There was an error running your command ${interaction.commandName}`,
          err as Error
        );
        if (interaction.replied) {
          await interaction.followUp({ embeds: [errEmbed] });
        } else {
          await interaction.followUp({ embeds: [errEmbed] });
        }
      }
    } else if (interaction.isButton()) {
      try {
        await handleButton(client, interaction);
      } catch (err) {
        const errEmbed = Error(
          "Error",
          `There was an error running your command ${interaction.customId}`,
          err as Error
        );
        if (interaction.replied) {
          await interaction.followUp({ embeds: [errEmbed] });
        } else {
          await interaction.followUp({ embeds: [errEmbed] });
        }
      }
    } else if (interaction.isButton()) {
      await handleButton(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    await interaction.reply({
      content: "An error has occurred! Please report this to the admins",
    });
    log.error("An error has occured while handling a slash command");
    return;
  }
  await interaction.deferReply({ ephemeral: slashCommand.ephemeral });
  log.info(`Ran command ${slashCommand.name} for ${interaction.user.username}`);
  await slashCommand.run(client, interaction);
};

const handleButton = async (
  client: Client,
  interaction: ButtonInteraction
): Promise<void> => {
  const buttonHandler = buttonHandlers.find(
    (c) => c.customId === interaction.customId
  );
  if (interaction.customId === "yes" || interaction.customId === "no") {
    await interaction.deferUpdate();
    return;
  }
  if (!buttonHandler) {
    await interaction.reply({
      content: "An error has occurred! Please report this to the admins",
    });
    log.error("An error has occured while handling a slash command");
    return;
  }

  await interaction.deferReply({ ephemeral: buttonHandler.ephemeral });
  log.info(`Ran button ${buttonHandler.name} for ${interaction.user.username}`);
  buttonHandler.run(client, interaction);
};
