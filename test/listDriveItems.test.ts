import "dotenv/config";
import { listDriveItems, createGraphClient } from "../src";

const siteId = process.env.TEST_SITE_ID!;

describe("listDriveItems", () => {
  const client = createGraphClient();
  it("gets the sites from sharepoint", async () => {
    const res = await listDriveItems({ client, siteId });
    console.log(res.value);

    expect(res.value.length).toBeGreaterThan(0);
    expect(res.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Jim is my friend",
        }),
      ])
    );
  });
});
