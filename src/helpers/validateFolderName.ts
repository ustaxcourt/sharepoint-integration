export type ValidateFolderName = (folderName: string) => void;

export const validateFolderName: ValidateFolderName = (folderName) => {
  if (folderName.indexOf("/") !== -1) {
    throw new Error("Folder name cannot have a slash (/) in it");
  }
};
