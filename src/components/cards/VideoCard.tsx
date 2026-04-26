import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";

const VideoCard = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative max-h-54 w-full flex">
        <Image
          src={img}
          height={215}
          width={369}
          alt="member image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 cursor-pointer bg-black/50 flex items-end">
          <div className="text-white px-6 py-4 space-y-1 flex flex-col">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="line-clamp-1">{desc}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <FaRegCirclePlay size={84} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
