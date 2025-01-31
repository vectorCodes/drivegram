import { createContext, useContext } from 'react';

import { File, Folder } from '@prisma/client';

export const fileManagerContext = createContext(
  {} as {
    files: File[];
    folders: Folder[];
    currentFolder: Folder | null;
    isLoading: boolean;

    selectedFile: File | null;
    selectedFolder: Folder | null;

    refetch: () => void;
    setSelectedFile(file: File | null): void;
    setSelectedFolder(
      folder: Folder | null,
    ): void;
  },
);

export const useFileManager = () => {
  const context = useContext(fileManagerContext);
  return context;
};
