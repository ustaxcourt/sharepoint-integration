import { Client } from "@microsoft/microsoft-graph-client";

export type GetFolderItemParams = {
  client: Client;
  item: string;
  siteId: string;
  parentFolderId?: string;
};

export type GetFolderItemResult =
  | {
      id: string;
      fields: {
        [key: string]: any;
      };
    }
  | undefined;

export type GetFolderItemFunction = ({
  client,
  item,
  siteId,
  parentFolderId,
}: GetFolderItemParams) => Promise<GetFolderItemResult>;

export const getFolderItem: GetFolderItemFunction = async ({
  client,
  item,
  siteId,
  parentFolderId,
}) => {
  try {
    if (parentFolderId) {
      return await client
        .api(`/sites/${siteId}/drive/items/${parentFolderId}:/${item}`)
        .get();
    }

    return await client.api(`/sites/${siteId}/drive/root:/${item}`).get();
  } catch (err) {
    // i think we get an error if the item is not found

    // if not we should throw it
    console.log(err);
    return null;
  }
};
