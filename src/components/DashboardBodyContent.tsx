import React, { ReactNode } from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import AddNewBtn from "./AddNewBtn";

const DashboardBodyContent = ({
  children,
  title,
  addBtnText,
  openAddModal,
  setOpenAddModal,
  addBtn = true,
}: {
  title: string;
  addBtnText: string;
  children: ReactNode;
  openAddModal: boolean;
  setOpenAddModal: (value: boolean) => void;
  addBtn?: boolean;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h5 className="text-2xl font-semibold text-pBlue">{title}</h5>
          <BreadcrumbComponent />
        </div>
        {addBtn && (
          <AddNewBtn
            text={addBtnText}
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
          />
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardBodyContent;
