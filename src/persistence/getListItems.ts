import { Client } from "@microsoft/microsoft-graph-client";
import { getAll } from "./getAll";

export type GetListItemsParams = {
  client: Client;
  siteId: string;
  listId: string;
};

export type GetListItemsResult = [
  {
    [key: string]: any;
  }
];

export type GetListItemsFunction = ({
  client,
  siteId,
  listId,
}: GetListItemsParams) => Promise<GetListItemsResult>;

export const getListItems: GetListItemsFunction = async ({
  client,
  siteId,
  listId,
}) => {
  const result = await getAll({
    client,
    queryString: `/sites/${siteId}/lists/${listId}/items?$expand=fields`,
  });

  return result;
};
