
import Image from "next/image";
import ReadMoreBtn from "../ReadMoreBtn";

const ServiceCard = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
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
        <h3 className="font-semibold text-tBlue text-xl">{title}</h3>
        <p className="text-pGray grow">
          {desc}
        </p>
        <ReadMoreBtn text="Continue Reading" link={`/our-services/${title}`} />
      </div>
    </div>
  );
};

export default ServiceCard;
