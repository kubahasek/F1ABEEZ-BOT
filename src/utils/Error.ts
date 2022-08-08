import { EmbedBuilder } from "@discordjs/builders";

export function Error(title: string, desc: string, error: Error): EmbedBuilder {
  let embed = new EmbedBuilder().setTitle(title).setColor(15548997).addFields({
    name: "❌ Error",
    value: desc,
  });
  return embed;
}
