import Image from "next/image";
import React from "react";

const MeetOurMemberCard = ({
  img,
  title,
  desig,
  desc,
}: {
  img: string;
  title: string;
  desig?: string;
  desc: string;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="max-h-54 w-full flex">
        <Image
          src={img}
          height={215}
          width={369}
          alt="member image"
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-4 flex flex-col">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          {desig && <p className="text-sm text-pGray">{desig}</p>}
        </div>
        <p className="text-justify grow">{desc}</p>
      </div>
    </div>
  );
};

export default MeetOurMemberCard;
