// src/components/cards/OfficeCard.jsx
"use client";

import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdBusinessCenter,
} from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

interface OfficeCardProps {
  name: string;
  type: string;
  address: string;
  phones: string[];
  emails: string[];
  mapLink?: string;
  isMainOffice?: boolean;
}

const OfficeCard = ({
  name,
  type,
  address,
  phones,
  emails,
  mapLink,
  isMainOffice,
}: OfficeCardProps) => {
  return (
    mapLink && (
      <Link href={mapLink} target="_blank">
        <div
          className={`border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300}`}
        >
          <div className="p-6">
            <div className="p-4 bg-pBlue rounded-lg h-16 w-16 mb-7">
              <Image
                src="/office.png"
                height={32}
                width={32}
                alt="office icon"
              />
            </div>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h6 className="font-bold text-pBlue text-xl md:text-2xl">
                  {name}
                </h6>
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
            <div className="flex gap-3 mb-3">
              <MdPhone className="text-pBlue text-xl shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-2">
                {phones.map((phone, idx) => (
                  <div
                    key={idx}
                    className="block text-pGray text-sm md:text-base hover:text-pBlue transition-colors mb-1"
                  >
                    {phone}{idx < phones.length - 1 && ","}
                  </div>
                ))}
              </div>
            </div>

            {/* Emails */}
            <div className="flex gap-3">
              <MdEmail className="text-pBlue text-xl shrink-0 mt-0.5" />
              <div>
                {emails.map((email, idx) => (
                  <a
                    key={idx}
                    href={`mailto:${email}`}
                    className="block text-pGray text-sm md:text-base hover:text-pBlue transition-colors"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export default OfficeCard;
