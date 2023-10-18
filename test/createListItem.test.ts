import "dotenv/config";
import {
  createListItem,
  getListItem,
  deleteListItem,
  createGraphClient,
} from "../src";

const listId = process.env.TEST_LIST_ID!;
const siteId = process.env.TEST_SITE_ID!;

describe("createListItem", () => {
  const newItem = {
    Title: "asdf123", // TODO: make more random
  };

  const client = createGraphClient();
  let id: string;

  afterAll(async () => {
    await deleteListItem({ client, itemId: id!, listId, siteId });
  });

  it("creates a list item", async () => {
    id = await createListItem({
      client,
      listId,
      siteId,
      newItem,
    });

    expect(Number(id)).toBeGreaterThan(0);

    const result = await getListItem({ client, listId, siteId, itemId: id });
    expect(result).toMatchObject(newItem);
  });
});
