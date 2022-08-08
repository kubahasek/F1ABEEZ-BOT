import { CommandInteraction, Client, BaseInteraction } from "discord.js";
import { Commands } from "../Commands";
import { log } from "../utils/Logger";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: BaseInteraction) => {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({
      content: "An error has occurred! Please report this to the admins",
    });
    log.error("An error has occured while handling a slash command");
    return;
  }

  await interaction.deferReply();
  log.info(`Ran command ${slashCommand.name} for ${interaction.user.username}`);
  slashCommand.run(client, interaction);
};
