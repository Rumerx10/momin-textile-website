"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const MachineCard = ({
  img,
  brand,
  machineName,
  origin,
  totalQuantity,
  productionCapacity,
}: {
  img: string;
  brand: string;
  machineName: string;
  origin: string;
  totalQuantity: string;
  productionCapacity: string;
}) => {
  let pathname = usePathname();
  if (pathname.includes("explore-all-machines")) {
    pathname = pathname.replace("/explore-all-machines", "");
  }

  return (
    <div className="border rounded-lg hover:border-pBlue duration-300 overflow-hidden">
      <div className="relative h-54 w-full flex">
        <Image
          src={img}
          height={215}
          width={369}
          alt="member image"
          className="object-cover"
        />
        <div className="absolute left-4 top-4 bg-pBlue text-xs text-white py-2 px-4 rounded-sm">
          {brand}
        </div>
      </div>
      <div className="p-6 space-y-6 flex flex-col">
        <div>
          <p className="text-sm text-pGray">Total Quantity: {totalQuantity}</p>
          <h3 className="font-bold text-lg">{machineName}</h3>
          <p className="text-pGray">({origin})</p>
        </div>
        <div>
          <p className="text-pGray">Production Capacity</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl text-[#374151]">
              {productionCapacity}
            </p>
            <p className="text-pGray">MTR/DAY</p>
          </div>
        </div>
      </div>
      <Link
        href={`${pathname}/${machineName.toLowerCase().replace(/\s+/g, "-")}`}
        className="w-full"
      >
        <button className="w-full flex items-center justify-center bg-pBlue hover:bg-hBlue duration-300 text-white font-medium py-4.5">
          Know More
        </button>
      </Link>
    </div>
  );
};

export default MachineCard;
