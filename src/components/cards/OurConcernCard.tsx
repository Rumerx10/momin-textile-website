import Image from "next/image";
import ReadMoreBtn from "../ReadMoreBtn";
import Link from "next/link";

const OurConcernCard = ({
  title,
  desc,
  imageSrc = "/logo.png",
}: {
  title: string;
  desc: string;
  imageSrc?: string;
}) => {
  return (
    <Link href={`/our-concerns/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="group bg-white border border-gray-100 rounded-lg p-6 md:p-8 hover:shadow-lg transition-all duration-300 h-full">
        <div className="flex flex-col gap-5 h-full">
          {/* Logo/Icon Section */}
          <div className="w-16 h-16 relative">
            <Image
              src={imageSrc}
              alt={title}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl md:text-2xl text-pBlue">
            {title}
          </h3>

          {/* Description - This will take available space */}
          <p className="text-pGray text-sm md:text-base grow">
            {desc}
          </p>

          {/* See Details Button - Will always stay at bottom */}
          <div className="mt-auto">
            <ReadMoreBtn
              text="See Details"
              link={`/our-concerns/${title.toLowerCase().replace(/\s+/g, "-")}`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OurConcernCard;
