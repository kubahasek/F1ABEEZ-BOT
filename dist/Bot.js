"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const interactionCreate_1 = tslib_1.__importDefault(require("./listeners/interactionCreate"));
const on_join_1 = tslib_1.__importDefault(require("./listeners/on_join"));
const on_leave_1 = tslib_1.__importDefault(require("./listeners/on_leave"));
const ready_1 = tslib_1.__importDefault(require("./listeners/ready"));
const Logger_1 = require("./utils/Logger");
dotenv_1.default.config();
Logger_1.log.info("Bot is starting...");
const token = process.env.DISCORD_TOKEN;
if (!token) {
    throw new Error("No token found!");
}
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [discord_js_1.Partials.Channel],
});
(0, ready_1.default)(client);
(0, interactionCreate_1.default)(client);
(0, on_join_1.default)(client);
(0, on_leave_1.default)(client);
client.login(token);
//# sourceMappingURL=Bot.js.map