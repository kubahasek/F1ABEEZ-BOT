import { Client } from "discord.js";
import GetChannel from "../utils/GetChannel";

export default (client: Client): void => {
  client.on("guildMemberRemove", async (member) => {
    const leavingChannel = await GetChannel(
      client,
      "leavingChannel",
      member.guild.id
    );
    if (leavingChannel && leavingChannel.isTextBased()) {
      await leavingChannel.send(
        `**${member.displayName}** has left the server.`
      );
    }
  });
};
