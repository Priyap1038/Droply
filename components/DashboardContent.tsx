"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { FileUp, FileText, User } from "lucide-react";
// import FileUploadForm from "@/components/FileUploadForm";
import FileUploadForm from "components/FileUploadForm"
import FileList from "components/FileList";
import UserProfile from "components/UserProfile";
import { useSearchParams } from "next/navigation";



// 👇 import modal/dialog from HeroUI (or shadcn/ui if you prefer)
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";

import { useUser } from "@clerk/nextjs";

interface DashboardContentProps {
  userId: string;
}

export default function DashboardContent({
  userId,
}: DashboardContentProps) {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [currentFolderName, setCurrentFolderName] = useState<string | null>(null);

  // 👇 state for preview modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null, folderName?: string | null) => {
    setCurrentFolder(folderId);
    setCurrentFolderName(folderName ?? null);
  }, []);

  return (
    <>
      <div className="pt-24 mb-14 space-y-4">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          Welcome back,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            {isLoaded ? (user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || "User") : "User"}
          </span>
          !
        </h2>

        <p className="text-muted-foreground text-lg font-medium">
          Manage and organize your digital assets with ease.
        </p>
      </div>

      <Tabs
        aria-label="Dashboard Tabs"
        color="primary"
        variant="light"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        classNames={{
          base: "w-full overflow-x-auto",
          tabList: "gap-4 sm:gap-8 p-1 bg-muted/20 rounded-2xl border border-border/30",
          tab: "py-6 px-6 h-auto whitespace-nowrap rounded-xl transition-all duration-300 data-[selected=true]:bg-background data-[selected=true]:shadow-sm data-[selected=true]:text-primary",
          cursor: "bg-transparent shadow-none border-none",
          tabContent: "font-bold text-base"
        }}
      >
        <Tab
          key="files"
          title={
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5" />
              <span>My Library</span>
            </div>
          }
        >
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <Card className="border border-border/50 bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden">
                <CardHeader className="flex gap-3 px-6 pt-6 pb-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <FileUp className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Upload
                  </h2>
                </CardHeader>
                <CardBody className="px-6 pb-6">
                  <FileUploadForm
                    userId={userId}
                    onUploadSuccess={handleFileUploadSuccess}
                    currentFolder={currentFolder}
                    currentFolderName={currentFolderName}
                  />
                </CardBody>
              </Card>
            </div>

            {/* File List Section */}
            <div className="lg:col-span-3">
              <Card className="border border-border/50 bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden">
                <CardHeader className="flex gap-3 px-8 pt-8 pb-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    All Files
                  </h2>
                </CardHeader>
                <CardBody className="px-8 pb-8">
                  <FileList
                    userId={userId}
                    refreshTrigger={refreshTrigger}
                    onFolderChange={handleFolderChange}
                    onImageClick={(url: string) => setPreviewImage(url)}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-2.5">
              <User className="h-5 w-5" />
              <span>Account</span>
            </div>
          }
        >
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserProfile />
          </div>
        </Tab>
      </Tabs>

      {/* 🔹 Image Preview Modal */}
      <Modal isOpen={!!previewImage} onClose={() => setPreviewImage(null)} size="5xl">
        <ModalContent>
          <ModalHeader>Image Preview</ModalHeader>
          <ModalBody>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto rounded"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

