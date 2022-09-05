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
import { SubmitIncident } from "../utils/Notion";
import { ErrorEmbed } from "../utils/Error";
import GetChannel from "../utils/GetChannel";
import { log } from "../utils/Logger";

const messages = {
  gamertag: {
    question: "What is your gamertag?",
  },
  description: {
    question: "Please describe your incident!",
  },
  tier: {
    question: "What is your tier?",
  },
  evidence: {
    question:
      "Please provide video evidence! (only reply with links to a video)",
  },
  driversInvolved: {
    question:
      "What is the gamertag(s) of the driver(s) involved? (For penalties, reply with N/A)",
  },
  lap: {
    question: "What lap did this incident occur on?",
  },
};

export const IncidentReportButtonHandler: ButtonHandler = {
  name: "incidentReport",
  customId: "incidentreportbutton",
  ephemeral: true,
  run: async (client: Client, interaction: ButtonInteraction) => {
    await interaction.followUp({
      content: `Please follow the bot to your DMs to submit your incident! <@${interaction.user.id}>`,
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
    const incident: Incident = {
      gamertag: "",
      lap: "",
      involvedDriver: "",
      evidence: "",
      description: "",
      tier: "",
    };
    userDM.send({ content: messages.gamertag.question }).then(() => {
      userDM
        .awaitMessages({ filter: filter, max: 1, maxProcessed: 1, time: 60000 })
        .then((collected) => {
          let value = collected.first()?.content;
          if (value) {
            incident.gamertag = value;
          }
          userDM.send({ content: messages.description.question }).then(() => {
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
                  incident.description = value;
                }
                userDM
                  .send({ content: messages.driversInvolved.question })
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
                          incident.involvedDriver = value;
                        }
                        userDM
                          .send({ content: messages.lap.question })
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
                                  incident.lap = value;
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
                                          incident.evidence = value;
                                        }
                                        userDM
                                          .send({
                                            content: messages.tier.question,
                                            components: [TierMenu],
                                          })
                                          .then(() => {
                                            userDM
                                              .awaitMessageComponent({
                                                filter: componentFilter,
                                                time: 60000,
                                                componentType:
                                                  ComponentType.SelectMenu,
                                              })
                                              .then((collected) => {
                                                let value = collected.values[0];
                                                if (value) {
                                                  incident.tier = value;
                                                }
                                                try {
                                                  SubmitIncident(incident).then(
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
                                                        "⚠️ A new ticket has been reported! ⚠"
                                                      )
                                                      .addFields(
                                                        {
                                                          name: "Tier",
                                                          value: incident.tier,
                                                        },
                                                        {
                                                          name: "Drivers Involved",
                                                          value: `${incident.gamertag} vs ${incident.involvedDriver}`,
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
                                                      log.error(
                                                        err as Error,
                                                        incident
                                                      );
                                                    }
                                                } catch (err) {
                                                  const embed = ErrorEmbed(
                                                    "Incident Reports",
                                                    "There's been an error submmitting your incident. Please report this to the admins",
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
