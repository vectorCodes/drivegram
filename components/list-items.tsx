'use client';

import { File, Folder } from '@prisma/client';

import FileItem from './file-manager/file-item';
import FolderItem from './file-manager/folder-item';

function ListItems({
  files,
  folders,
}: {
  files: File[];
  folders: Folder[];
}) {
  if (!files.length && !folders.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">
            No items to show
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid h-full flex-1 grid-cols-4 content-start justify-evenly gap-1 overflow-auto p-2 lg:grid-cols-6 2xl:grid-cols-8">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
          />
        ))}
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}

export default ListItems;
