import { Channel, Client, TextChannel } from "discord.js";
import { db } from "../prisma/Client";

export default async function GetChannel(
  client: Client,
  channelName: string,
  serverId: string
): Promise<Channel | undefined> {
  const channel = await db.channels.findFirst({
    where: {
      channelName: { equals: channelName + serverId },
    },
  });
  if (channel != null) {
    const FetchedChannel = await client.channels.fetch(channel.channelId);
    if (FetchedChannel) {
      return FetchedChannel;
    }
  } else {
    throw new Error("Channel not found");
  }
}
