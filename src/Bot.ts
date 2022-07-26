import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
import on_join from "./listeners/on_join";
import on_leave from "./listeners/on_leave";
import ready from "./listeners/ready";
import { log } from "./utils/Logger";

dotenv.config();
log.info("Bot is starting...");

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error("No token found!");
}

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});

ready(client);
interactionCreate(client);
on_join(client);
on_leave(client);
client.login(token);
