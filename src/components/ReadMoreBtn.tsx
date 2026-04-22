import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const ReadMoreBtn = ({
  text = "Read More Details",
  link,
}: {
  text?: string;
  link: string;
}) => {
  return (
    <div>
      <Link href={link}>
        <button
          className="flex items-center justify-center 
                    duration-300 gap-2 hover:gap-5 py-3 rounded-sm text-pBlue hover:text-pViolet
                    font-medium cursor-pointer"
        >
          <p>{text}</p>
          <FaArrowRightLong />
        </button>
      </Link>
    </div>
  );
};

export default ReadMoreBtn;
