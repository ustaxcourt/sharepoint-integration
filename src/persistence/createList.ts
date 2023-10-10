import { Client } from "@microsoft/microsoft-graph-client";

export type CreateListParams = {
  client: Client;
  newList: ListStructure;
  siteId: string;
};

export type ListStructure = {
  displayName: string;
  columns: [
    {
      name: string;
      text?: ListItemProperties;
      dateTime?: ListItemProperties;
      boolean: ListItemProperties;
      number: ListItemProperties;
    }
  ];
  list: {
    template: "genericList";
  };
};

export type ListItemProperties = {
  enforceUniqueValues?: boolean;
  isRequired?: boolean;
  indexed?: boolean;
};

export type PersistenceCreateListFunction = ({
  client,
  newList,
  siteId,
}: CreateListParams) => Promise<any>;

export const createList: PersistenceCreateListFunction = async ({
  client,
  newList,
  siteId,
}) => {
  const res = await client.api(`/sites/${siteId}/lists`).post(newList);

  return res;
};
