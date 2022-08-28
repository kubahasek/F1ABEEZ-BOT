import {
  ButtonInteraction,
  Client,
  ComponentType,
  EmbedBuilder,
  Message,
  SelectMenuInteraction,
} from "discord.js";
import { Incident } from "../types/SubmissionTypes";
import { TierMenu } from "../selectMenus/TierMenu";
import { ButtonHandler } from "../types/ButtonHandler";
import { SubmitAppeal, SubmitIncident } from "../utils/Notion";
import { ErrorEmbed } from "../utils/Error";
import GetChannel from "../utils/GetChannel";
import { log } from "../utils/Logger";
import { Appeal } from "../types/Appeal";

const messages = {
  caseNumber: {
    question: "What is the case number?",
  },
  gamertag: {
    question: "What is your gamertag?",
  },
  reason: {
    question: "Please state the reason for your appeal",
  },
  additionalInfo: {
    question:
      "Please provide any additional information to support your appeal! (If you don't have any reply with N/A.)",
  },
  evidence: {
    question:
      "Please provide additional evidence to support your reply! (Only reply with links to gamerdvr or other services.)",
  },
  involvedDriver: {
    question:
      "What is the gamertag(s) of the driver(s) involved? (For penalties reply with N/A.)",
  },
};

export const AppealReportButtonHandler: ButtonHandler = {
  name: "appealReport",
  customId: "appealreportbutton",
  ephemeral: true,
  run: async (client: Client, interaction: ButtonInteraction) => {
    await interaction.followUp({
      content: `Please follow the bot to your DMs to submit your appeal! <@${interaction.user.id}>`,
    });
    const filter = (m: Message) => m.author.id === interaction.user.id;
    const componentFilter = (i: SelectMenuInteraction) => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };
    const user = interaction.user;
    const userDM = await user.createDM();

    // const collector = userDM.createMessageCollector({ time: 360000 });
    // const componentCollector = userDM.createMessageComponentCollector({
    //   time: 180000,
    // });
    const appeal: Appeal = {
      caseNumber: "",
      gamertag: "",
      reason: "",
      additionalInfo: "",
      evidence: "",
      involvedDriver: "",
    };
    userDM.send({ content: messages.caseNumber.question }).then(() => {
      userDM
        .awaitMessages({ filter: filter, max: 1, maxProcessed: 1, time: 60000 })
        .then((collected) => {
          let value = collected.first()?.content;
          if (value) {
            appeal.caseNumber = value;
          }
          userDM.send({ content: messages.gamertag.question }).then(() => {
            userDM
              .awaitMessages({
                filter: filter,
                max: 1,
                maxProcessed: 1,
                time: 60000,
              })
              .then((collected) => {
                let value = collected.first()?.content;
                if (value) {
                  appeal.gamertag = value;
                }
                userDM.send({ content: messages.reason.question }).then(() => {
                  userDM
                    .awaitMessages({
                      filter: filter,
                      max: 1,
                      maxProcessed: 1,
                      time: 60000,
                    })
                    .then((collected) => {
                      let value = collected.first()?.content;
                      if (value) {
                        appeal.reason = value;
                      }
                      userDM
                        .send({ content: messages.additionalInfo.question })
                        .then(() => {
                          userDM
                            .awaitMessages({
                              filter: filter,
                              max: 1,
                              maxProcessed: 1,
                              time: 60000,
                            })
                            .then((collected) => {
                              let value = collected.first()?.content;
                              if (value) {
                                appeal.additionalInfo = value;
                              }
                              userDM
                                .send({ content: messages.evidence.question })
                                .then(() => {
                                  userDM
                                    .awaitMessages({
                                      filter: filter,
                                      max: 1,
                                      maxProcessed: 1,
                                      time: 60000,
                                    })
                                    .then((collected) => {
                                      let value = collected.first()?.content;
                                      if (value) {
                                        appeal.evidence = value;
                                      }
                                      userDM
                                        .send({
                                          content:
                                            messages.involvedDriver.question,
                                        })
                                        .then(() => {
                                          userDM
                                            .awaitMessages({
                                              filter: filter,
                                              max: 1,
                                              maxProcessed: 1,
                                              time: 60000,
                                            })
                                            .then((collected) => {
                                              let value =
                                                collected.first()?.content;
                                              if (value) {
                                                appeal.involvedDriver = value;
                                              }
                                              try {
                                                SubmitAppeal(appeal).then(
                                                  (res) => {
                                                    userDM.send({
                                                      embeds: [res],
                                                    });
                                                  }
                                                );
                                                const reportEmbed =
                                                  new EmbedBuilder()
                                                    .setColor(16236412)
                                                    .setTitle(
                                                      "⚠️ A new appeal has been submitted! ⚠"
                                                    )
                                                    .addFields(
                                                      {
                                                        name: "Case Number",
                                                        value:
                                                          appeal.caseNumber,
                                                      },
                                                      {
                                                        name: "Drivers Involved",
                                                        value: `${appeal.gamertag} vs ${appeal.involvedDriver}`,
                                                      }
                                                    );
                                                if (interaction.guildId)
                                                  try {
                                                    const logChannel =
                                                      GetChannel(
                                                        client,
                                                        "reportLog",
                                                        interaction.guildId
                                                      ).then((channel) => {
                                                        if (
                                                          channel?.isTextBased()
                                                        ) {
                                                          channel.send({
                                                            embeds: [
                                                              reportEmbed,
                                                            ],
                                                          });
                                                        }
                                                      });
                                                  } catch (err) {
                                                    log.error(err as Error);
                                                  }
                                              } catch (err) {
                                                const embed = ErrorEmbed(
                                                  "Appeal Report",
                                                  "There's been an error submmitting your appeal. Please report this to the admins",
                                                  err as Error
                                                );
                                                userDM.send({
                                                  embeds: [embed],
                                                });
                                              }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
              });
          });
        });
    });
  },
};
