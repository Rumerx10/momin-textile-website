// components/cards/OurConcernCard.jsx
"use client";
import Image from "next/image";
import ReadMoreBtn from "../ReadMoreBtn";
import Link from "next/link";

const OurConcernCard = ({
  title,
  desc,
  imageSrc = "/logo.png",
  concernId,
}: {
  title: string;
  desc: string;
  imageSrc?: string;
  concernId?: number;
}) => {
  return (
    <Link href={`/our-concerns/${concernId}`}>
      <div className="group bg-white border border-gray-100 rounded-lg p-6 md:p-8 hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
        <div className="flex flex-col gap-5 h-full">
          {/* Logo/Icon Section */}
          <div className="w-16 h-16 relative overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h6 className="font-bold text-xl md:text-2xl text-pBlue line-clamp-2">
            {title}
          </h6>

          {/* Description */}
          <p className="text-pGray text-sm md:text-base grow line-clamp-3">
            {desc}
          </p>

          {/* See Details Button */}
          <div className="mt-auto">
            <ReadMoreBtn
              text="See Details"
              link={`/our-concerns/${concernId}`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OurConcernCard;