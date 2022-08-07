import { Client } from "discord.js";
import dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

dotenv.config();
console.log("Bot is starting...");

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error("No token found!");
}

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);
client.login(token);
