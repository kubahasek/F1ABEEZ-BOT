"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../prisma/Client");
async function GetChannel(client, tier, serverId) {
    const tierLead = await Client_1.db.tierLeads.findFirst({
        where: {
            tierName: { equals: tier + serverId },
        },
    });
    if (tierLead != null) {
        const FetchedUser = await client.users.fetch(tierLead.userId);
        if (FetchedUser) {
            return { user: FetchedUser, gamertag: tierLead.gamertag };
        }
    }
    else {
        throw new Error("Role not found");
    }
}
exports.default = GetChannel;
//# sourceMappingURL=GetTierLead.js.map