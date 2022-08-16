import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
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
  ],
  partials: [Partials.Channel],
});

ready(client);
interactionCreate(client);
client.login(token);
