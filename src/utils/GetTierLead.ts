import { Channel, Client, Role, TextChannel, User } from "discord.js";
import { db } from "../prisma/Client";

export default async function GetChannel(
  client: Client,
  tier: string,
  serverId: string
): Promise<{ user: User; gamertag: string } | undefined> {
  const tierLead = await db.tierLeads.findFirst({
    where: {
      tierName: { equals: tier + serverId },
    },
  });
  if (tierLead != null) {
    const FetchedUser = await client.users.fetch(tierLead.userId);
    if (FetchedUser) {
      return { user: FetchedUser, gamertag: tierLead.gamertag };
    }
  } else {
    throw new Error("Role not found");
  }
}
