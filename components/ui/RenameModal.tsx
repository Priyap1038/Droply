import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Edit2 } from "lucide-react";

interface RenameModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentName: string;
  onConfirm: (newName: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  onOpenChange,
  currentName,
  onConfirm,
}) => {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newName.trim() && newName !== currentName) {
      onConfirm(newName.trim());
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{
        base: "border border-default-200 bg-default-50",
        header: "border-b border-default-200",
        footer: "border-t border-default-200",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex gap-2 items-center">
            <Edit2 className="h-5 w-5 text-primary" />
            <span>Rename Item</span>
          </ModalHeader>
          <ModalBody className="py-6">
            <Input
              autoFocus
              label="New Name"
              placeholder="Enter new name"
              value={newName}
              onValueChange={setNewName}
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="default"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isDisabled={!newName.trim() || newName === currentName}
              startContent={<Edit2 className="h-4 w-4" />}
            >
              Rename
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RenameModal;
