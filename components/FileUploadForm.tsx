"use client";

import { useState, useRef } from "react";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Input } from "@heroui/input";
import {
  Upload,
  X,
  FileUp,
  AlertTriangle,
  FolderPlus,
  ArrowRight,
  Shield,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";



interface FileUploadFormProps {
  userId: string;
  onUploadSuccess?: () => void;
  currentFolder?: string | null;
  currentFolderName?: string | null;
}

export default function FileUploadForm({
  userId,
  onUploadSuccess,
  currentFolder = null,
  currentFolderName = null,
}: FileUploadFormProps) {

  let { getToken } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Folder creation state
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];

      // Validate file size (5MB limit)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(droppedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    if (currentFolder) {
      formData.append("parentId", currentFolder);
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      let token = await getToken();

      await axios.post("/api/files/upload", formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      addToast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
        color: "success",
      });

      // Clear the file after successful upload
      clearFile();

      // Call the onUploadSuccess callback if provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      console.log("form dta is collected", [...formData.entries()])

    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
      addToast({
        title: "Upload Failed",
        description: "We couldn't upload your file. Please try again.",
        color: "danger",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      addToast({
        title: "Invalid Folder Name",
        description: "Please enter a valid folder name.",
        color: "danger",
      });
      return;
    }

    setCreatingFolder(true);

    try {
      await axios.post("/api/folders", {
        name: folderName.trim(),
        userId: userId,
        parentId: currentFolder,
      });

      addToast({
        title: "Folder Created",
        description: `Folder "${folderName}" has been created successfully.`,
        color: "success",
      });

      // Reset folder name and close modal
      setFolderName("");
      setFolderModalOpen(false);

      // Call the onUploadSuccess callback to refresh the file list
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      addToast({
        title: "Folder Creation Failed",
        description: "We couldn't create the folder. Please try again.",
        color: "danger",
      });
    } finally {
      setCreatingFolder(false);
    }
  };




  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-2 mb-2">
        <Button
          color="primary"
          variant="flat"
          startContent={<FolderPlus className="h-4 w-4" />}
          onClick={() => setFolderModalOpen(true)}
          className="flex-1"
        >
          New Folder
        </Button>
        <Button
          color="primary"
          variant="flat"
          startContent={<FileUp className="h-4 w-4" />}
          onClick={() => fileInputRef.current?.click()}
          className="flex-1"
        >
          Add Image
        </Button>
      </div>

      {/* Current folder indicator */}
      {currentFolder && currentFolderName && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
          <FolderPlus className="h-4 w-4 shrink-0" />
          <span className="truncate">
            Uploading into: <strong>{currentFolderName}</strong>
          </span>
        </div>
      )}

      {/* File drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${error
            ? "border-destructive/30 bg-destructive/5"
            : file
              ? "border-primary/30 bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
      >
        {!file ? (
          <div className="space-y-4">
            <div className="bg-primary/10 h-16 w-16 mx-auto rounded-2xl flex items-center justify-center">
              <FileUp className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">
                Drag and drop your image here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary cursor-pointer hover:underline font-bold inline bg-transparent border-0 p-0 m-0"
                >
                  browse files
                </button>
              </p>
              <p className="text-xs text-muted-foreground mt-2">High-quality images up to 5MB</p>
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              aria-label="Upload"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card border border-border rounded-xl">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <FileUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-bold text-foreground truncate max-w-[150px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {file.size < 1024
                      ? `${file.size} B`
                      : file.size < 1024 * 1024
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={clearFile}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-xl flex items-center gap-2 border border-destructive/20 animate-in fade-in zoom-in duration-200">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold text-left">{error}</span>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <Progress
                  value={progress}
                  color="primary"
                  size="sm"
                  showValueLabel={false}
                  className="max-w-full"
                  aria-label="File upload progress"
                />
                <p className="text-[10px] text-muted-foreground font-bold text-right">{progress}% complete</p>
              </div>
            )}

            <Button
              color="primary"
              startContent={<Upload className="h-4 w-4" />}
              endContent={!uploading && <ArrowRight className="h-4 w-4" />}
              onClick={handleUpload}
              isLoading={uploading}
              className="w-full font-bold shadow-lg shadow-primary/20 h-12 rounded-xl"
              isDisabled={!!error}
            >
              {uploading ? "Uploading..." : "Upload Securely"}
            </Button>
          </div>
        )}
      </div>

      {/* Upload tips */}
      <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          Secure storage tips
        </h4>
        <ul className="text-xs text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">• End-to-end private image vault</li>
          <li className="flex items-center gap-2">• JPG, PNG, GIF, WebP optimized</li>
          <li className="flex items-center gap-2">• 5MB high-capacity limit</li>
        </ul>
      </div>

      {/* Create Folder Modal */}
      <Modal
        isOpen={folderModalOpen}
        onOpenChange={setFolderModalOpen}
        backdrop="blur"
        classNames={{
          base: "bg-background border border-border",
          header: "border-b border-border",
          footer: "border-t border-border",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FolderPlus className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold">Create New Workspace</span>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                Organize your files into a dedicated folder.
              </p>
              <Input
                type="text"
                label="Workspace Name"
                placeholder="e.g., Summer Vacation 2024"
                value={folderName}
                onValueChange={setFolderName}
                labelPlacement="outside"
                variant="bordered"
                size="lg"
                classNames={{
                  inputWrapper: "h-14 border-border/80 hover:border-primary focus-within:border-primary transition-all rounded-xl mt-2",
                  label: "text-foreground font-bold",
                  input: "text-base"
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && folderName.trim()) {
                    handleCreateFolder();
                  }
                }}
                autoFocus
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              className="font-bold"
              onClick={() => setFolderModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="font-bold shadow-lg shadow-primary/20"
              onClick={handleCreateFolder}
              isLoading={creatingFolder}
              isDisabled={!folderName.trim()}
              endContent={!creatingFolder && <ArrowRight className="h-4 w-4" />}
            >
              Create Folder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}