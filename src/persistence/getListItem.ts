import { Client } from "@microsoft/microsoft-graph-client";

export type GetListItemParams = {
  client: Client;
  itemId: string;
  listId: string;
  siteId: string;
};

export type GetListItemFunction = ({
  client,
  itemId,
  listId,
  siteId,
}: GetListItemParams) => Promise<{
  [key: string]: any;
}>;

export const getListItem: GetListItemFunction = async ({
  client,
  itemId,
  listId,
  siteId,
}) => {
  const item = await client
    .api(`/sites/${siteId}/lists/${listId}/items/${itemId}`)
    .get();

  return item.fields;
};
