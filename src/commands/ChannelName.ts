import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../types/Command";

const nameDic = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "Q",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
  "-": "-",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  " ": "-",
};

export const ChannelName: Command = {
  name: "channelname",
  description: "Returns the channel name using the font used in the server",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "channelname",
      description: "Provide the name of the channel",
      required: true,
    },
  ],
  ephemeral: false,
  defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
  run: async (client: Client, interaction: CommandInteraction) => {
    let returnValue: string = "";
    if (interaction.options.data[0].value) {
      const channelName = interaction.options.data[0].value.toString();
      for (const char of channelName) {
        let index = Object.keys(nameDic).indexOf(char.toLowerCase());
        returnValue += Object.values(nameDic)[index];
      }
      await interaction.followUp({ content: "︱" + returnValue });
    }
  },
};
