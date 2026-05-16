import { ChevronRight } from "lucide-react";
import { IoFileTrayFullOutline } from "react-icons/io5";

const ContentSection = ({
  showContentMenu,
  setShowContentMenu,
}: {
  showContentMenu: boolean;
  setShowContentMenu: (value: boolean) => void;
}) => {
  return (
    <div className="px-4 py-6 border-t border-gray-200 first:border-t-0">
      <h6 className="text-xs font-semibold text-[#9CA3AF] uppercase mb-3">
        Content Section
      </h6>
      <button
        onClick={() => setShowContentMenu(!showContentMenu)}
        className={`w-full font-medium text-left flex items-center gap-2 px-3 py-2 rounded-lg transition ${
          showContentMenu
            ? "bg-pBlue text-white"
            : "text-pBlue hover:bg-pBlue/15"
        }`}
      >
        <div className="w-6 h-6">
          <IoFileTrayFullOutline size={24} />
        </div>
        <span className="flex-1 whitespace-nowrap">Content Management</span>
        <ChevronRight
          size={16}
          className={`w-4 h-4 shrink-0 transition-transform ${
            showContentMenu ? "rotate-90" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default ContentSection;
