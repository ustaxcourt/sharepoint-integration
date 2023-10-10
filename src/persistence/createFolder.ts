import { Client } from "@microsoft/microsoft-graph-client";
import { createRootFolder } from "./createRootFolder";
import type { FolderOptions } from "../types/FolderOptions";
import { validateFolderName } from "../helpers/validateFolderName";

export type CreateFolderParams = {
  client: Client;
  folderName: string;
  opts?: FolderOptions;
  parentFolderId?: string;
  siteId: string;
};

export type CreateFolderFunction = ({
  client,
  folderName,
  opts,
  parentFolderId,
  siteId,
}: CreateFolderParams) => Promise<any>;

export const createFolder: CreateFolderFunction = async ({
  client,
  folderName,
  opts,
  parentFolderId,
  siteId,
}) => {
  folderName = folderName.trim();
  validateFolderName(folderName);

  if (!parentFolderId) {
    return createRootFolder({
      client,
      folderName: folderName,
      siteId,
    });
  }

  return client
    .api(`/sites/${siteId}/drive/items/${parentFolderId}/children`)
    .post({
      name: folderName,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
      ...opts,
    });
};
