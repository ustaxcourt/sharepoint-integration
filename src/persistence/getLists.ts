import { Client } from "@microsoft/microsoft-graph-client";

export type GetListsParams = {
  client: Client;
  siteId: string;
};

export type GetListsFunction = ({ client, siteId }: GetListsParams) => Promise<{
  [key: string]: any;
}>;

export const getLists: GetListsFunction = async ({ client, siteId }) => {
  const items = await client.api(`/sites/${siteId}/lists`).get();

  return items;
};
