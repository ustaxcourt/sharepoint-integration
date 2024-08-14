import { Client } from "@microsoft/microsoft-graph-client";

export type ListDriveItemsParams = {
  client: Client;
  parentFolderId?: string;
  siteId: string;
};

export type DriveItem = {
  createdDateTime: string;
  id: string;
  name: string;
  lastModifiedDateTime: string;
}

export type ListDriveItemsFunction = ({
  client,
  parentFolderId,
  siteId,
}: ListDriveItemsParams) => Promise<{ value: DriveItem[] }>;

export const listDriveItems: ListDriveItemsFunction = async ({
  client,
  parentFolderId,
  siteId,
}) => {

  parentFolderId = parentFolderId || 'root';
  const path = `/sites/${siteId}/drive/items/${parentFolderId}/children`;
  console.log(path);
  const items = await client
    .api(`/sites/${siteId}/drive/items/${parentFolderId}/children`)
    .get();

  console.log(items);
  return items;
};
