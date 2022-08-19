import {
  Client,
  ButtonInteraction,
  Message,
  SelectMenuInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
} from "discord.js";
import { ButtonHandler } from "../types/ButtonHandler";
import GetChannel from "../utils/GetChannel";

export const SuggestionButtonHandler: ButtonHandler = {
  name: "suggestionbuttonhandler",
  customId: "suggestionbutton",
  ephemeral: true,
  run: async (client: Client, interaction: ButtonInteraction) => {
    await interaction.followUp({
      content: `Please follow the bot to your DMs to submit your suggestion! <@${interaction.user.id}>`,
    });
    const filter = (m: Message) => m.author.id === interaction.user.id;
    const componentFilter = (i: ButtonInteraction) => {
      return i.user.id === interaction.user.id;
    };
    const user = interaction.user;
    const userDM = await user.createDM();
    let suggestion: string;
    let anonymous: boolean;
    userDM
      .send({
        content:
          "Please type your suggestion here, the F1ABEEZ Team will have a look it as soon as possible! Thank you for contributing!",
      })
      .then(() => {
        userDM
          .awaitMessages({
            filter: filter,
            max: 1,
            maxProcessed: 1,
            time: 60000,
          })
          .then((msg) => {
            let message = msg.first()?.content;
            if (message) {
              suggestion = message;
            }
            const anonymousMenu =
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                  .setCustomId("yes")
                  .setLabel("Yes")
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId("no")
                  .setLabel("No")
                  .setStyle(ButtonStyle.Danger)
              );
            userDM
              .send({
                content: "Do you wish to stay anonymous?",
                components: [anonymousMenu],
              })
              .then(() => {
                userDM
                  .awaitMessageComponent({
                    filter: componentFilter,
                    time: 60000,
                    componentType: ComponentType.Button,
                  })
                  .then((btn) => {
                    console.log("got here");

                    if (interaction.guildId) {
                      GetChannel(
                        client,
                        "suggestionLog",
                        interaction.guildId
                      ).then((channel) => {
                        if (channel?.isTextBased()) {
                          const embed =
                            btn.customId === "no"
                              ? new EmbedBuilder()
                                  .setTitle(
                                    "🚨A new suggestion has been submitted🚨"
                                  )
                                  .setColor(16236412)
                                  .addFields(
                                    {
                                      name: "Submitted By:",
                                      value: interaction.user.tag,
                                    },
                                    { name: "Suggestion:", value: suggestion }
                                  )
                              : new EmbedBuilder()
                                  .setTitle(
                                    "🚨A new suggestion has been submitted🚨"
                                  )
                                  .setColor(16236412)
                                  .addFields({
                                    name: "Suggestion:",
                                    value: suggestion,
                                  });
                          channel.send({ embeds: [embed] });
                          userDM.send({
                            content:
                              "Your suggestion has been submitted to the F1ABEEZ Team. Thank you!",
                          });
                        }
                      });
                    }
                  });
              });
          });
      });
  },
};
