import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export type Profile = {
  pointsF1: number;
  tier: string;
  penaltyPoints: number;
  team: string;
};

export async function GetProfile(gamertag: string): Promise<Profile> {
  try {
    if (process.env.profileDatabaseID) {
      const response = await notion.databases.query({
        database_id: process.env.profileDatabaseID,
        filter: {
          property: "Gamertag",
          title: { equals: gamertag },
        },
      });
      if (response.results.length > 0) {
        const profile = (await notion.pages.retrieve({
          page_id: response.results[0].id,
        })) as any;
        let points = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: profile.properties["RU:Current F1 Points"].id,
        })) as any;
        let tier = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: profile.properties["Current F1 Tier"].id,
        })) as any;
        let penaltyPoints = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: profile.properties["Penalty Points"].id,
        })) as any;
        let team = (await notion.pages.properties.retrieve({
          page_id: response.results[0].id,
          property_id: profile.properties["Team"].id,
        })) as any;
        points = parseInt(points.property_item.rollup.number);
        tier = tier.multi_select[0].name;
        team = (await notion.pages.properties.retrieve({
          page_id: team.results[0].relation.id,
          property_id: "title",
        })) as any;
        team = team.results[0].title.plain_text;
        penaltyPoints = parseInt(penaltyPoints.property_item.rollup.number);
        return { pointsF1: points, tier, team, penaltyPoints };
      } else {
        throw new Error("Profile not found");
      }
    } else {
      throw new Error("Profile database ID not found in environment variables");
    }
  } catch (err) {
    throw new Error("An error occured" + err);
  }
}
