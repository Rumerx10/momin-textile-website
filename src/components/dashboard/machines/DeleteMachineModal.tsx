// app/dashboard/machines/DeleteMachineModal.jsx
"use client";
import { useEffect } from "react";
import { MdOutlineWarningAmber } from "react-icons/md";

interface DeleteMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  machineName?: string;
  isLoading?: boolean;
}

const DeleteMachineModal = ({
  isOpen,
  onClose,
  onConfirm,
  machineName,
  isLoading = false,
}: DeleteMachineModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-6">
          <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
            <MdOutlineWarningAmber className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="text-center mt-4 px-6">
          <h6 className="text-xl font-bold text-pBlue">Delete Machine?</h6>
        </div>

        <div className="text-center mt-2 px-6">
          <p className="text-pGray text-sm">
            Are you sure you want to delete "{machineName || "this machine"}"?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex border-t border-gray-100 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-pGray font-medium hover:bg-gray-50 transition-colors rounded-bl-2xl"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 text-red-500 font-medium hover:bg-red-50 transition-colors rounded-br-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMachineModal;