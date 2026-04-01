"use client";

import { File, Star, Trash } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import Badge from "./ui/Badge";
import type { File as FileType } from "../lib/db/schema";

interface FileTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  files: FileType[];
  starredCount: number;
  trashCount: number;
}

export default function FileTabs({
  activeTab,
  onTabChange,
  files,
  starredCount,
  trashCount,
}: FileTabsProps) {
  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={(key) => onTabChange(key as string)}
      color="primary"
      variant="light"
      classNames={{
        base: "w-full overflow-x-auto",
        tabList: "gap-2 sm:gap-4 md:gap-6 flex-nowrap min-w-full p-1.5 bg-muted/20 rounded-2xl border border-border/30",
        tab: "py-6 px-4 h-auto whitespace-nowrap rounded-xl transition-all duration-300 data-[selected=true]:bg-background data-[selected=true]:shadow-sm data-[selected=true]:text-primary",
        tabContent: "font-bold text-sm",
        cursor: "bg-transparent shadow-none border-none",
      }}
    >
      <Tab
        key="all"
        title={
          <div className="flex items-center gap-2.5">
            <File className="h-4 w-4" />
            <span>All Files</span>
            <div className="ml-1 px-1.5 py-0.5 rounded-full bg-muted text-[10px] font-bold text-muted-foreground border border-border/50">
              {files.filter((file) => !file.isTrash).length}
            </div>
          </div>
        }
      />
      <Tab
        key="starred"
        title={
          <div className="flex items-center gap-2.5">
            <Star className="h-4 w-4" />
            <span>Starred</span>
            <div className="ml-1 px-1.5 py-0.5 rounded-full bg-warning/10 text-warning text-[10px] font-bold border border-warning/20">
              {starredCount}
            </div>
          </div>
        }
      />
      <Tab
        key="trash"
        title={
          <div className="flex items-center gap-2.5">
            <Trash className="h-4 w-4" />
            <span>Trash</span>
            <div className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold border border-destructive/20">
              {trashCount}
            </div>
          </div>
        }
      />
    </Tabs>
  );
}