import { Client } from "@microsoft/microsoft-graph-client";
import { getAll } from "./getAll";

export type GetUsersParams = {
  client: Client;
};

export type GetUsersFunction = ({
  client,
}: GetUsersParams) => Promise<GetUsersResult>;

export type GetUsersResult = [
  {
    id: string;
    displayName: string;
    [key: string]: any;
  }
];

export const getUsers: GetUsersFunction = async ({ client }) => {
  const items = (await getAll({
    client,
    queryString: `/users`,
  })) as GetUsersResult;

  return items;
};
