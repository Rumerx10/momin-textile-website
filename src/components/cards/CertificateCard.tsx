// src/components/cards/CertificateCard.jsx
"use client";

import Image from "next/image";

const CertificateCard = ({
  title,
  subTitle,
  desc,
  img,
}: {
  title: string;
  subTitle: string;
  desc: string;
  img: string;
}) => {
  return (
    <div className="flex flex-col items-center lg:items-start md:flex-row gap-5">
      {/* Image Section */}
      <div className="p-6 shrink-0 h-32.5 w-32.5 border-2 rounded-lg">
        <Image
          height={84}
          width={84}
          src={img}
          alt={title}
          className="bg-gray-50 rounded-lg w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-2/3 lg:w-full space-y-2 md:space-y-3">
        <div>
          {/* Title - heading from API */}
          <h5 className="text-pBlue text-2xl md:text-3xl lg:text-4xl font-bold">
            {title}
          </h5>
          
          {/* Subtitle - subheading from API */}
          <p className="text-pGray text-sm mt-1">{subTitle}</p>
        </div>

        {/* Description - HTML content */}
        <div 
          className="text-pGray text-sm md:text-base text-justify leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </div>
    </div>
  );
};

export default CertificateCard;