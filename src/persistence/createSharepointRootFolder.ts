import { Client } from "@microsoft/microsoft-graph-client";
import type { FolderOptions } from "../types/FolderOptions";
import { validateFolderName } from "../helpers/validateFolderName";

export type CreateSharepointRootFolder = ({
  client,
  folderName,
  siteId,
}: {
  client: Client;
  folderName: string;
  opts?: FolderOptions;
  siteId: string;
}) => Promise<any>;

export const createSharepointRootFolder: CreateSharepointRootFolder = async ({
  client,
  folderName,
  opts,
  siteId,
}) => {
  validateFolderName(folderName);
  return await client.api(`/sites/${siteId}/drive/root/children`).post({
    name: folderName,
    folder: {},
    "@microsoft.graph.conflictBehavior": "rename",
    ...opts,
  });
};
