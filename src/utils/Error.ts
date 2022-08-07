import { EmbedBuilder } from "@discordjs/builders";

export function ErrorEmbed(title: string, desc: string): EmbedBuilder {
  let embed = new EmbedBuilder().setTitle(title).setColor(15548997).addFields({
    name: "❌ Error",
    value: desc,
  });
  return embed;
}
