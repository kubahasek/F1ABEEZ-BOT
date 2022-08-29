"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
exports.default = (client) => {
    client.on("guildMemberRemove", async (member) => {
        const leavingChannel = await (0, GetChannel_1.default)(client, "leavingChannel", member.guild.id);
        if (leavingChannel && leavingChannel.isTextBased()) {
            await leavingChannel.send(`**${member.displayName}** has left the server.`);
        }
    });
};
//# sourceMappingURL=on_leave.js.map