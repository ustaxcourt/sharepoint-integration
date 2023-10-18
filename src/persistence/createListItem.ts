import { Client } from "@microsoft/microsoft-graph-client";

export type CreateListItemParams = {
  client: Client;
  listId: string;
  siteId: string;
  newItem: {
    [key: string]: any;
  };
};

export type CreateListItemFunction = ({
  client,
  listId,
  siteId,
  newItem,
}: CreateListItemParams) => Promise<string>;

export const createListItem: CreateListItemFunction = async ({
  client,
  listId,
  siteId,
  newItem,
}) => {
  const createdItem = await client
    .api(`/sites/${siteId}/lists/${listId}/items`)
    .post({ fields: newItem });

  return createdItem.id;
};
