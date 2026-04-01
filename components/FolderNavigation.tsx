"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "@heroui/button";

interface FolderNavigationProps {
  folderPath: Array<{ id: string; name: string }>;
  navigateUp: () => void;
  navigateToPathFolder: (index: number) => void;
}

export default function FolderNavigation({
  folderPath,
  navigateUp,
  navigateToPathFolder,
}: FolderNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm overflow-x-auto pb-3">
      <Button
        variant="bordered"
        size="sm"
        isIconOnly
        onClick={navigateUp}
        isDisabled={folderPath.length === 0}
        className="rounded-xl border-border bg-card hover:bg-muted transition-all"
      >
        <ArrowUpFromLine className="h-4 w-4" />
      </Button>
      <Button
        variant="bordered"
        size="sm"
        onClick={() => navigateToPathFolder(-1)}
        className={`${folderPath.length === 0 ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"} rounded-xl font-bold transition-all px-4`}
      >
        Library
      </Button>
      {folderPath.map((folder, index) => (
        <div key={folder.id} className="flex items-center gap-2">
          <span className="text-muted-foreground opacity-50 font-bold">/</span>
          <Button
            variant="bordered"
            size="sm"
            onClick={() => navigateToPathFolder(index)}
            className={`${index === folderPath.length - 1 ? "bg-primary/10 text-primary border-primary/20" : "bg-card border-border hover:bg-muted"} rounded-xl font-bold transition-all px-4 text-ellipsis overflow-hidden max-w-[150px]`}
            title={folder.name}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  );
}