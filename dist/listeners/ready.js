"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
const Logger_1 = require("../utils/Logger");
exports.default = (client) => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        await client.application.commands.set(Commands_1.Commands);
        Logger_1.log.info(`${client.user.username} is online`);
    });
};
//# sourceMappingURL=ready.js.map