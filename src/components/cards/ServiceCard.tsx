import Image from "next/image";
import ReadMoreBtn from "../ReadMoreBtn";
import { MdOutlineCalendarMonth } from "react-icons/md";

const ServiceCard = ({
  img,
  title,
  desc,
  date,
}: {
  img: string;
  title: string;
  desc: string;
  date?: string;
}) => {
  return (
    <div className="rounded-lg overflow-hidden border flex flex-col h-full">
      <div className="flex h-54">
        <Image
          src={img}
          alt={title}
          height={216}
          width={369}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="p-6 flex flex-col grow">
        {date && (
          <div className="text-pGray flex items-center gap-2">
            <MdOutlineCalendarMonth />
            <p className="text-sm ">{date}</p>
          </div>
        )}
        <h3 className="font-semibold text-tBlue text-xl">{title}</h3>
        <p className="text-pGray grow">{desc}</p>
        <ReadMoreBtn text="Continue Reading" link={`/our-services/${title}`} />
      </div>
    </div>
  );
};

export default ServiceCard;
