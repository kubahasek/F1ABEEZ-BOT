import { Channel, Client, Role, TextChannel } from "discord.js";
import { db } from "../prisma/Client";
import { Roles } from "../types/Roles";

export default async function GetChannel(
  client: Client,
  roleName: Roles,
  serverId: string
): Promise<Role | undefined> {
  const role = await db.roles.findFirst({
    where: {
      roleName: { equals: roleName + serverId },
    },
  });
  if (role != null) {
    const FetchedRole = await (
      await client.guilds.fetch(serverId)
    ).roles.fetch(role.roleId);
    if (FetchedRole) {
      return FetchedRole;
    }
  } else {
    throw new Error("Role not found");
  }
}
