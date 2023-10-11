import { Client } from "@microsoft/microsoft-graph-client";
import { getAll } from "./getAll";

export type GetSitesParams = { client: Client };

export type SiteInfo = {
  id: number;
  displayName: string;
};

export type GetSitesFunction = ({
  client,
}: GetSitesParams) => Promise<SiteInfo[]>;

export const getSites: GetSitesFunction = async ({ client }) => {
  const res = await getAll({ client, queryString: "/sites" });
  return res.map((item) => ({
    displayName: item.displayName,
    id: item.id,
  }));
};
