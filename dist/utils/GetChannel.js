"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../prisma/Client");
async function GetChannel(client, channelName, serverId) {
    const channel = await Client_1.db.channels.findFirst({
        where: {
            channelName: { equals: channelName + serverId },
        },
    });
    if (channel != null) {
        const FetchedChannel = await client.channels.fetch(channel.channelId);
        if (FetchedChannel) {
            return FetchedChannel;
        }
    }
    else {
        throw new Error("Channel not found");
    }
}
exports.default = GetChannel;
//# sourceMappingURL=GetChannel.js.map