import { Client, ButtonInteraction } from "discord.js";

export interface ButtonHandler {
  name: string;
  customId: string;
  ephemeral: boolean;
  run: (client: Client, interaction: ButtonInteraction) => void;
}
