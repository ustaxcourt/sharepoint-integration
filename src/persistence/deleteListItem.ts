import { Client } from "@microsoft/microsoft-graph-client";

export type DeleteListItemParams = {
  client: Client;
  itemId: string;
  listId: string;
  siteId: string;
};

export type DeleteListItemFunction = ({
  client,
  itemId,
  listId,
  siteId,
}: DeleteListItemParams) => Promise<boolean>;

export const deleteListItem: DeleteListItemFunction = async ({
  client,
  itemId,
  listId,
  siteId,
}) => {
  await client.api(`/sites/${siteId}/lists/${listId}/items/${itemId}`).delete();

  return true;
};
