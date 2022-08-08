import { Client } from "discord.js";
import { Commands } from "../Commands";
import { log } from "../utils/Logger";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands);

    log.info(`${client.user.username} is online`);
  });
};
