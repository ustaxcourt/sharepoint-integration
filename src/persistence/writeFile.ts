import {
  StreamUpload,
  LargeFileUploadTask,
  UploadResult,
  LargeFileUploadSession,
  Client,
} from "@microsoft/microsoft-graph-client";

export type WriteFileParams = {
  client: Client;
  fileName: string;
  fileSize: number;
  parentFolderId: string;
  readStream: NodeStream;
  siteId: string;
};

export type WriteFileFunction = ({
  client,
  fileName,
  fileSize,
  parentFolderId,
  readStream,
  siteId,
}: WriteFileParams) => Promise<UploadResult>;

export const writeFile: WriteFileFunction = async ({
  client,
  fileName,
  fileSize,
  parentFolderId,
  readStream,
  siteId,
}) => {
  const payload = {
    item: {
      "@microsoft.graph.conflictBehavior": "rename",
    },
  };
  const options = {
    rangeSize: 1024 * 1024,
  };

  fileName = fileName
    .trim()
    .replace(/#/g, "")
    .replace(/%20/g, " ")
    .replace(",", " ")
    .replace(":", " ");

  const fileObject = new StreamUpload(readStream, fileName, fileSize);

  // build our upload session
  const uploadSession: LargeFileUploadSession =
    await LargeFileUploadTask.createUploadSession(
      client,
      `/sites/${siteId}/drive/items/${parentFolderId}:/${fileName}:/createuploadsession`,
      payload
    );

  // build our upload task
  const uploadTask = new LargeFileUploadTask(
    client,
    fileObject,
    uploadSession,
    options
  );

  // perform upload task!
  const uploadResult = await uploadTask.upload();

  return uploadResult;
};
