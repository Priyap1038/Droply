import { Card, CardBody } from "@heroui/card";
import { File } from "lucide-react";

interface FileEmptyStateProps {
  activeTab: string;
}

export default function FileEmptyState({ activeTab }: FileEmptyStateProps) {
  return (
    <Card shadow="none" className="border border-border/50 bg-muted/20 rounded-3xl">
      <CardBody className="text-center py-24">
        <div className="bg-primary/10 h-24 w-24 mx-auto rounded-full flex items-center justify-center mb-8 ring-8 ring-primary/5">
          <File className="h-10 w-10 text-primary opacity-80" />
        </div>
        <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">
          {activeTab === "all" && "Your Library is Waiting"}
          {activeTab === "starred" && "No Favorites Yet"}
          {activeTab === "trash" && "Clean Slate"}
        </h3>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
          {activeTab === "all" &&
            "Start your secure image journey by uploading your first asset to the cloud."}
          {activeTab === "starred" &&
            "Highlight your most important images for instant access from your dashboard."}
          {activeTab === "trash" &&
            "Your workspace is currently clear. Deleted files will stay here for 30 days."}
        </p>
      </CardBody>
    </Card>
  );
}