import { Plus } from "lucide-react";
import React from "react";

const AddNewBtn = ({
  text = "Add New",
  openAddModal,
  setOpenAddModal,
}: {
  text?: string;
  openAddModal: boolean;
  setOpenAddModal: (value: boolean) => void;
}) => {
  return (
    !openAddModal && (
      <button
        onClick={() => setOpenAddModal(!openAddModal)}
        className="flex gap-2 items-center bg-pBlue px-4 py-2.5 rounded-sm text-white font-medium"
      >
        <Plus />
        <p>{text}</p>
      </button>
    )
  );
};

export default AddNewBtn;
