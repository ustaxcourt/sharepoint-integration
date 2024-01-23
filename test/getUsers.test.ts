import "dotenv/config";
import { createGraphClient, getUsers, getUser } from "../src";

type User = {
  id: string;
  displayName: string;
};

describe("getUsers", () => {
  const client = createGraphClient();

  it("gets the users from aad", async () => {
    const res = await getUsers({ client });

    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toMatchObject<User>;
  });
});

describe("getUser", () => {
  const client = createGraphClient();

  it("gets a user from aad", async () => {
    const res = await getUsers({ client });
    const user = await getUser({ client, userId: res[0].id });
    expect(user).toMatchObject<User>;
  });
});
