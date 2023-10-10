import { Client } from "@microsoft/microsoft-graph-client";

export type GetAllParams = {
  client: Client;
  queryString: string;
};

export type GetAllFunction = ({
  client,
  queryString,
}: GetAllParams) => Promise<any>;

export const getAll: GetAllFunction = async ({ client, queryString }) => {
  let res = await client.api(queryString).get();
  if (!res["@odata.nextLink"]) {
    return res.value;
  }
  const moreData = await getAll({
    client,
    queryString: res["@odata.nextLink"],
  });

  return [...res.value, ...moreData];
};
