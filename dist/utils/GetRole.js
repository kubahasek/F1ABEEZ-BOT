"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../prisma/Client");
async function GetChannel(client, roleName, serverId) {
    const role = await Client_1.db.roles.findFirst({
        where: {
            roleName: { equals: roleName + serverId },
        },
    });
    if (role != null) {
        const FetchedRole = await (await client.guilds.fetch(serverId)).roles.fetch(role.roleId);
        if (FetchedRole) {
            return FetchedRole;
        }
    }
    else {
        throw new Error("Role not found");
    }
}
exports.default = GetChannel;
//# sourceMappingURL=GetRole.js.map