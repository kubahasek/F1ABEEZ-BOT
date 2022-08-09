import { EmbedBuilder } from "@discordjs/builders";
import { Client } from "@notionhq/client";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function GetProfile(gamertag: string) {
  try {
    if (process.env.profileDatabaseID) {
      const response = (await notion.databases.query({
        database_id: process.env.profileDatabaseID,
        filter: {
          property: "Gamertag",
          title: { equals: gamertag },
        },
      })) as any;
      if (response.results.length > 0) {
        let points = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id:
            response.results[0].properties["RU:Current F1 Points"].id,
        })) as any;
        let tier = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: response.results[0].properties["Current F1 Tier"].id,
        })) as any;
        let penaltyPoints = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: response.results[0].properties["Penalty Points"].id,
        })) as any;
        let team = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: response.results[0].properties["Team"].id,
        })) as any;
        points = parseInt(points.property_item.rollup.number);
        tier = tier.multi_select[0].name;
        team = (await notion.pages.properties.retrieve({
          page_id: team.results[0].relation.id,
          property_id: "title",
        })) as any;
        team = team.results[0].title.plain_text;
        penaltyPoints = parseInt(penaltyPoints.property_item.rollup.number);
        let embed = new EmbedBuilder()
          .setTitle(gamertag)
          .setColor(16236412)
          .addFields(
            { name: "Tier", value: tier },
            { name: "Team", value: team },
            { name: "F1 Points", value: points.toString() },
            { name: "Penalty Points", value: penaltyPoints.toString() }
          );
        return embed;
      } else {
        throw new Error("Profile not found");
      }
    } else {
      throw new Error("Profile database ID not found in environment variables");
    }
  } catch (err) {
    throw new Error("An error occured " + err);
  }
}

export async function GetAppeals(gamertag: string) {
  try {
    if (process.env.appealsDatabaseId) {
      const response = await notion.databases.query({
        database_id: process.env.appealsDatabaseId,
        filter: {
          or: [
            {
              property: "Appealed By",
              rich_text: { contains: gamertag },
            },
            {
              property: "GamerTag(s) involved",
              rich_text: {
                contains: gamertag,
              },
            },
          ],
        },
      });
      let embed = new EmbedBuilder()
        .setTitle(gamertag + "'s appeals")
        .setColor(16236412);
      let fields: Array<{ name: string; value: string }> = new Array();
      if (response.results.length > 0) {
        const appeals = response.results;
        await Promise.all(
          appeals.map(async (a: any) => {
            await Promise.allSettled([
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id: a.properties["Status"].id,
              }) as any,
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id: a.properties["GamerTag(s) involved"].id,
              }) as any,
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id: a.properties["AP-Case Number"].id,
              }) as any,
            ]).then((results) => {
              if (
                results[0].status === "fulfilled" &&
                results[1].status === "fulfilled" &&
                results[2].status === "fulfilled"
              ) {
                let status = results[0].value.select.name;
                let driversInvolved =
                  results[1].value.results[0].rich_text.plain_text;
                let caseNumber = results[2].value.results[0].title.plain_text;
                let url = `[LINK](https://f1abeez.com/${a.url.substring(22)})`;
                fields.push({
                  name: `${caseNumber} - ${status}`,
                  value: `${gamertag} vs ${driversInvolved} ${url}`,
                });
              }
            });
          })
        ).then(() => {
          embed.addFields(fields);
          return embed;
        });
        return embed;
      } else {
        embed.addFields({
          name: "None",
          value: "No appeals were found for this gamertag",
        });
        return embed;
      }
    } else {
      throw new Error("Profile database ID not found in environment variables");
    }
  } catch (err) {
    throw new Error("An error occured" + err);
  }
}

export async function GetTickets(gamertag: string) {
  try {
    if (process.env.incidentDatabaseId) {
      const response = await notion.databases.query({
        database_id: process.env.incidentDatabaseId,
        filter: {
          or: [
            {
              property: "Reported By",
              rich_text: { contains: gamertag },
            },
            {
              property:
                "GamerTag(s) of Driver(s) involved incident (N/A for penalties)",
              rich_text: {
                contains: gamertag,
              },
            },
          ],
        },
        sorts: [
          {
            property: "Case Number",
            direction: "ascending",
          },
        ],
      });
      let embed = new EmbedBuilder()
        .setTitle(gamertag + "'s tickets")
        .setColor(16236412);
      let fields: Array<{ name: string; value: string }> = new Array();
      if (response.results.length > 0) {
        const tickets = response.results;
        await Promise.all(
          tickets.map(async (a: any) => {
            await Promise.allSettled([
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id: a.properties["Status"].id,
              }) as any,
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id:
                  a.properties[
                    "GamerTag(s) of Driver(s) involved incident (N/A for penalties)"
                  ].id,
              }) as any,
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id: a.properties["Case Number"].id,
              }) as any,
              notion.pages.properties.retrieve({
                page_id: a.id,
                property_id: a.properties["Reported By"].id,
              }) as any,
            ]).then((results) => {
              if (
                results[0].status === "fulfilled" &&
                results[1].status === "fulfilled" &&
                results[2].status === "fulfilled" &&
                results[3].status === "fulfilled"
              ) {
                let status = results[0].value.select.name;
                let driversInvolved =
                  results[1].value.results[0].rich_text.plain_text;
                let caseNumber =
                  results[2].value.results.length > 0
                    ? results[2].value.results[0].title.plain_text
                    : "Case Number not assigned";
                let reportedBy =
                  results[3].value.results[0].rich_text.plain_text;
                let url = `[LINK](https://f1abeez.com/${a.url.substring(22)})`;
                fields.push({
                  name: `${caseNumber} - ${status}`,
                  value: `${reportedBy} vs ${driversInvolved} ${url}`,
                });
              }
            });
          })
        ).then(() => {
          embed.addFields(fields);
          return embed;
        });
        return embed;
      } else {
        embed.addFields({
          name: "None",
          value: "No appeals were found for this gamertag",
        });
        return embed;
      }
    } else {
      throw new Error("Profile database ID not found in environment variables");
    }
  } catch (err) {
    throw new Error("An error occured" + err);
  }
}
