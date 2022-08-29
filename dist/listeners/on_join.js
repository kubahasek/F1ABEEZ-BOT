"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GetChannel_1 = tslib_1.__importDefault(require("../utils/GetChannel"));
const GetRole_1 = tslib_1.__importDefault(require("../utils/GetRole"));
exports.default = (client) => {
    client.on("guildMemberAdd", async (member) => {
        const welcomeChannel = await (0, GetChannel_1.default)(client, "welcomeChannel", member.guild.id);
        const starterRole = await (0, GetRole_1.default)(client, "academyRole", member.guild.id);
        if (welcomeChannel && welcomeChannel.isTextBased() && starterRole) {
            await member.roles.add(starterRole);
            switch (member.guild.id) {
                case "774604623247573022":
                    await welcomeChannel.send({
                        content: `**Welcome <@${member.id}>**\n\nPlease use this chat if you have any questions and someone will be on hand.\n\nAll the information you need is on <#865379267977412618>`,
                    });
                    break;
                case "935253214285135952":
                    await welcomeChannel.send({
                        content: `Welcome to F2ABEEZ!<@${member.id}>\n\nYour dedicated F2 racing discord community. Please read <#937998062842957824> to get equated with our brand and information then, head over to <#937997355737833482> to get a seat in the next race that suits your pace! Please **put your gamertag into brackets behind your discord name**, thank you!`,
                    });
                default:
                    break;
            }
        }
    });
};
//# sourceMappingURL=on_join.js.map