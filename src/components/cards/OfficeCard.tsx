// components/cards/OfficeCard.jsx
"use client";

import { MdLocationOn, MdPhone, MdEmail, MdFax } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface OfficeCardProps {
  name: string;
  type: string;
  address: string;
  phones: string[];
  emails: string[];
  telephones?: string[];
  faxes?: string[];
  isMainOffice?: boolean;
}

const OfficeCard = ({
  name,
  type,
  address,
  phones,
  emails,
  telephones = [],
  faxes = [],
  isMainOffice,
}: OfficeCardProps) => {
  const handleCopy = async (
    e: React.MouseEvent,
    text: string,
    type: "Phone" | "Email" | "Fax",
  ) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied!`);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const allPhones = [...phones, ...telephones];

  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="p-6">
        <div className="p-4 bg-pBlue rounded-lg h-16 w-16 mb-7 group-hover:scale-110 transition-transform duration-300">
          <Image src="/office.png" height={32} width={32} alt="office icon" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h6 className="font-bold text-pBlue text-xl md:text-2xl">{name}</h6>
            <div className="flex items-center gap-2 mt-1">
              <HiOutlineBuildingOffice2 className="text-pBlue/60 text-sm" />
              <p className="text-pGray/70 text-sm">{type}</p>
            </div>
          </div>

          {isMainOffice && (
            <span className="bg-pBlue/10 text-pBlue text-xs font-medium px-3 py-1 rounded-full">
              Main Office
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex gap-3 mb-4">
          <MdLocationOn className="text-pBlue text-xl shrink-0 mt-0.5" />
          <div>
            <p className="text-pGray text-sm md:text-base leading-relaxed">
              {address}
            </p>
          </div>
        </div>

        {/* Phone Numbers */}
        {allPhones.length > 0 && (
          <div className="flex gap-3 mb-3">
            <MdPhone className="text-pBlue text-xl shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {allPhones.map((phone, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleCopy(e, phone, "Phone")}
                  className="text-pGray text-sm md:text-base hover:text-pBlue transition-colors"
                >
                  {phone}
                  {idx < allPhones.length - 1 && ","}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fax Numbers */}
        {faxes.length > 0 && (
          <div className="flex gap-3 mb-3">
            <MdFax className="text-pBlue text-xl shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {faxes.map((fax, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleCopy(e, fax, "Fax")}
                  className="text-pGray text-sm md:text-base hover:text-pBlue transition-colors"
                >
                  {fax}
                  {idx < faxes.length - 1 && ","}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Emails */}
        {emails.length > 0 && (
          <div className="flex gap-3">
            <MdEmail className="text-pBlue text-xl shrink-0 mt-0.5" />
            <div>
              {emails.map((email, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleCopy(e, email, "Email")}
                  className="block text-left text-pGray text-sm md:text-base hover:text-pBlue transition-colors"
                >
                  {email}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficeCard;
