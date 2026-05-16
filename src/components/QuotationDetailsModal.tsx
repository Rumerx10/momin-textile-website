// src/components/modals/QuotationDetailsModal.jsx
"use client";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  MdDownload,
  MdEmail,
  MdPhone,
  MdBusiness,
  MdPerson,
  MdMessage,
} from "react-icons/md";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

interface QuotationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    companyName: string;
    designation: string;
    message: string;
    attachments?: {
      name: string;
      url: string;
    }[];
  };
}

const QuotationDetailsModal = ({
  isOpen,
  onClose,
  data,
}: QuotationDetailsModalProps) => {
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-modern"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-5 md:p-6 flex justify-between items-center">
            <h5 className="font-bold text-pBlue text-xl md:text-2xl">
              Quotation Details
            </h5>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-300"
            >
              <RxCross2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 space-y-6">
            {/* Personal Information Section */}
            <div>
              <h6 className="font-semibold text-pBlue text-lg mb-4 border-l-4 border-pBlue pl-3">
                Personal Information
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPerson className="text-pBlue text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-pGray text-xs uppercase tracking-wide">
                      First Name
                    </p>
                    <p className="text-pBlue font-medium">{data.firstName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPerson className="text-pBlue text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-pGray text-xs uppercase tracking-wide">
                      Last Name
                    </p>
                    <p className="text-pBlue font-medium">{data.lastName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPhone className="text-pBlue text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-pGray text-xs uppercase tracking-wide">
                      Phone Number
                    </p>
                    <p className="text-pBlue font-medium">{data.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdEmail className="text-pBlue text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-pGray text-xs uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="text-pBlue font-medium break-all">
                      {data.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div>
              <h6 className="font-semibold text-pBlue text-lg mb-4 border-l-4 border-pBlue pl-3">
                Company Information
              </h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdBusiness className="text-pBlue text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-pGray text-xs uppercase tracking-wide">
                      Company Name
                    </p>
                    <p className="text-pBlue font-medium">{data.companyName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <HiOutlineBuildingOffice className="text-pBlue text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-pGray text-xs uppercase tracking-wide">
                      Designation
                    </p>
                    <p className="text-pBlue font-medium">{data.designation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div>
              <h6 className="font-semibold text-pBlue text-lg mb-4 border-l-4 border-pBlue pl-3">
                Message
              </h6>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex gap-3">
                  <MdMessage className="text-pBlue text-xl shrink-0" />
                  <p className="text-pGray text-sm leading-relaxed whitespace-pre-wrap">
                    {data.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Attached Documents Section */}
            {data.attachments && data.attachments.length > 0 && (
              <div>
                <h6 className="font-semibold text-pBlue text-lg mb-4 border-l-4 border-pBlue pl-3">
                  Attached Documents
                </h6>
                <div className="space-y-2">
                  {data.attachments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-pGray text-sm">{doc.name}</span>
                      <button className="text-pBlue hover:text-pBlue/80 transition-colors">
                        <MdDownload size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-pGray hover:border-pBlue hover:text-pBlue transition-colors duration-300 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Handle reply action
                  console.log("Reply to quotation");
                }}
                className="px-6 py-2.5 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium"
              >
                Reply to Quotation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationDetailsModal;
