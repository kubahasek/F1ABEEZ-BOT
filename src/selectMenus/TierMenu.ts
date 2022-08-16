import { SelectMenuBuilder } from "@discordjs/builders";
import { ActionRowBuilder } from "discord.js";

export const TierMenu = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
  new SelectMenuBuilder()
    .setCustomId("tierMenu")
    .setPlaceholder("Select a tier!")
    .addOptions(
      {
        label: "Tier 1",
        value: "Tier 1",
      },
      {
        label: "Tier 2",
        value: "Tier 2",
      },
      {
        label: "Tier 3",
        value: "Tier 3",
      },
      {
        label: "Tier M",
        value: "Tier M",
      }
    )
);
