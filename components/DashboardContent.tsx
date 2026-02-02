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

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

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

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-default-900 dark:text-white">
          Hi,{" "}
          <span className="text-primary">
            {userName?.length > 10
              ? `${userName?.substring(0, 10)}...`
              : userName?.split(" ")[0] || "there"}
          </span>
          !
        </h2>
        <p className="text-default-600 dark:text-gray-400 mt-2 text-lg">
          Your images are waiting for you.
        </p>
      </div>

      <Tabs
        aria-label="Dashboard Tabs"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        classNames={{
          tabList: "gap-6 border-b border-default-200 dark:border-gray-700",
          tab: "py-3 text-default-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 data-[selected=true]:text-primary data-[selected=true]:border-b-2 data-[selected=true]:border-primary",
          cursor: "bg-primary",
        }}
      >
        <Tab
          key="files"
          title={
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <span className="font-medium">My Files</span>
            </div>
          }
        >
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <Card className="border border-default-200 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex gap-3">
                  <FileUp className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-default-900 dark:text-white">
                    Upload
                  </h2>
                </CardHeader>
                <CardBody>
                  <FileUploadForm
                    userId={userId}
                    onUploadSuccess={handleFileUploadSuccess}
                    currentFolder={currentFolder}
                  />
                </CardBody>
              </Card>
            </div>

            {/* File List Section */}
            <div className="lg:col-span-2">
              <Card className="border border-default-200 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-default-900 dark:text-white">
                    Your Files
                  </h2>
                </CardHeader>
                <CardBody>
                  <FileList
                    userId={userId}
                    refreshTrigger={refreshTrigger}
                    onFolderChange={handleFolderChange}
                    // 👇 pass down image click handler
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
            <div className="flex items-center gap-3">
              <User className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </div>
          }
        >
          <div className="mt-8">
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
