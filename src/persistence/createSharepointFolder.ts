import { Client } from "@microsoft/microsoft-graph-client";
import { createSharepointRootFolder } from "./createSharepointRootFolder";
import type { FolderOptions } from "../types/FolderOptions";
import { validateFolderName } from "../helpers/validateFolderName";

export type CreateSharepointFolder = ({
  client,
  folderName,
  opts,
  parentId,
  siteId,
}: {
  client: Client;
  folderName: string;
  opts?: FolderOptions;
  parentId?: string;
  siteId: string;
}) => Promise<any>;

export const CreateSharepointFolder: CreateSharepointFolder = async ({
  client,
  folderName,
  opts,
  parentId,
  siteId,
}) => {
  validateFolderName(folderName);

  folderName = folderName.trim();

  if (!parentId) {
    return createSharepointRootFolder({
      client,
      folderName: folderName,
      siteId,
    });
  }

  return client.api(`/sites/${siteId}/drive/items/${parentId}/children`).post({
    name: folderName,
    folder: {},
    "@microsoft.graph.conflictBehavior": "rename",
    ...opts,
  });
};
