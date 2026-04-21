import Image from "next/image";
import { IoMdCall } from "react-icons/io";

const PriceQuotation = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch lg:items-center">
      {/* 📞 Call Section */}
      <div className="h-14 flex w-full lg:w-[35%]">
        <div className="bg-pBlue text-white px-4 flex items-center justify-center rounded-l-sm">
          <IoMdCall size={24} />
        </div>

        <div className="flex flex-col justify-center px-4 lg:px-6 border rounded-r-sm w-full">
          <p className="text-xs text-pGray text-center lg:text-left">
            Call For Price Quotation
          </p>
          <p className="font-bold text-tBlue text-center lg:text-left">
            +8801912 265 789
          </p>
        </div>
      </div>

      {/* 📄 Request Button */}
      <div className="h-14 w-full lg:w-[65%] bg-pBlue flex items-center justify-center gap-2 text-white rounded-sm">
        <Image
          src="/note-stack.png"
          alt="Note Stack Icon"
          height={20}
          width={20}
        />
        <p className="text-sm lg:text-base">Request for Price Quotation</p>
      </div>
    </div>
  );
};

export default PriceQuotation;
