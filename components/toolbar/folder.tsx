'use client';

import { FolderPlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useRef, useState } from 'react';

import {
  useParams,
  useSearchParams,
} from 'next/navigation';

import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog';
import { Input } from '#/components/ui/input';

import { trpc } from '#/lib/trpc/client';

import { useFileManager } from '../file-manager/context';

function FolderModal() {
  const params = useParams();
  const searchParam = useSearchParams();
  const { refetch } = useFileManager();
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const createFolder =
    trpc.createFolder.useMutation();

  function handleSubmit() {
    const path = searchParam.get('path');
    const name = nameRef.current?.value;
    if (!name) {
      toast.error('Please enter a name');
      return;
    }

    const accountId = params.accId as string;

    createFolder
      .mutateAsync({
        name,
        accountId,
        path: path ?? undefined,
      })
      .then(() => {
        setIsOpen(false);
        refetch();
      });
  }
  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button
            icon={<FolderPlusIcon size={18} />}
            variant="ghost"
            size="sm"
          >
            Add Folder
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add folder</DialogTitle>
            <DialogDescription>
              Enter the name of the folder you
              want to create
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              id="name"
              className="mt-1"
              placeholder="Enter folder name"
              ref={nameRef}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              isLoading={createFolder.isLoading}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FolderModal;
