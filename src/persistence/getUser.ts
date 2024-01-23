import { Client } from "@microsoft/microsoft-graph-client";

export type GetUserParams = {
  client: Client;
  userId: string;
};

export type GetUserFunction = ({ client }: GetUserParams) => Promise<{
  [key: string]: any;
}>;

export const getUser: GetUserFunction = async ({ client, userId }) => {
  const item = await client.api(`/users/${userId}`).get();

  return item;
};
