import { Client } from "@microsoft/microsoft-graph-client";

export type UpdateListItemParams = {
  client: Client;
  siteId: string;
  listId: string;
  itemId: string;
  updates: {
    [key: string]: any;
  };
};

export type UpdateListItemFunction = ({
  client,
  siteId,
  listId,
  itemId,
  updates,
}: UpdateListItemParams) => Promise<void>;

export const updateListItem: UpdateListItemFunction = async ({
  client,
  siteId,
  listId,
  itemId,
  updates,
}) => {
  await client
    .api(`/sites/${siteId}/lists/${listId}/items/${itemId}/fields`)
    .update(updates);
};
