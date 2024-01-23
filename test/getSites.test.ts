import "dotenv/config";
import { getSites, createGraphClient } from "../src";

describe("getSites", () => {
  const client = createGraphClient();
  it("gets the sites from sharepoint", async () => {
    const res = await getSites({ client });
    expect(res.length).toBeGreaterThan(0);
    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          displayName: "Mike Marcotte",
        }),
      ])
    );
  });
});
