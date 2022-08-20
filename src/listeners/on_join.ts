import { Client } from "discord.js";
import GetChannel from "../utils/GetChannel";
import GetRole from "../utils/GetRole";

export default (client: Client): void => {
  client.on("guildMemberAdd", async (member) => {
    const welcomeChannel = await GetChannel(
      client,
      "welcomeChannel",
      member.guild.id
    );
    const starterRole = await GetRole(client, "academyRole", member.guild.id);
    if (welcomeChannel && welcomeChannel.isTextBased() && starterRole) {
      await member.roles.add(starterRole);
      switch (member.guild.id) {
        case "774604623247573022":
          await welcomeChannel.send({
            content: `**Welcome <@${member.guild.id}>**\n\nPlease use this chat if you have any questions and someone will be on hand.\n\nAll the information you need is on <#865379267977412618>`,
          });
          break;
        case "935253214285135952":
          await welcomeChannel.send({
            content: `Welcome to F2ABEEZ!<@${member.guild.id}>\n\nYour dedicated F2 racing discord community. Please read <#937998062842957824> to get equated with our brand and information then, head over to <#937997355737833482> to get a seat in the next race that suits your pace! Please **put your gamertag into brackets behind your discord name**, thank you!`,
          });
        default:
          break;
      }
    }
  });
};
