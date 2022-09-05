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

export const ProfilePicRequestHandler: ButtonHandler = {
  name: "profilePicHandler",
  customId: "profilepicbutton",
  ephemeral: true,
  run: async (client: Client, interaction: ButtonInteraction) => {
    await interaction.followUp({
      content: `Please follow the bot to your DMs to submit your appeal! <@${interaction.user.id}>`,
    });
    const filter = (m: Message) => m.author.id === interaction.user.id;
    const user = interaction.user;
    const userDM = await user.createDM();

    const request = {
      gamertag: "",
      tier: "",
    };
    userDM
      .send({
        content:
          "What is your gamertag or the name you want written on your profile picture?",
      })
      .then(() =>
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
              request.gamertag = value;
            }
            userDM.send({ content: "What tier do you race in?" }).then(() =>
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
                    request.tier = value;
                  }
                  const requestEmbed = new EmbedBuilder()
                    .setTitle("New profile picture request!")
                    .setColor(16236412)
                    .addFields(
                      { name: "Gamertag", value: request.gamertag },
                      { name: "Tier", value: request.tier }
                    );
                  if (interaction.guildId) {
                    const michaelasInbox = GetChannel(
                      client,
                      "michaelaInbox",
                      interaction.guildId
                    ).then((channel) => {
                      if (channel?.isTextBased()) {
                        channel.send({ embeds: [requestEmbed] }).then(() => {
                          userDM.send({
                            content: "Your request has been submitted!",
                          });
                        });
                      }
                    });
                  }
                })
            );
          })
      );
  },
};
