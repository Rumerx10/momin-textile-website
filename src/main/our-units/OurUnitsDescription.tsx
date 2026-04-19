"use client";
import CompanyProfileCard from "@/src/components/CompanyProfileCard";
import QuickLinks from "@/src/components/QuickLinks";
import Image from "next/image";

const OurUnitsDescription = () => {
  return (
    <div className="container px-4 mx-auto py-16">
      <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Advanced Spinning Unit
          </h1>
          <div className="flex justify-center">
            <p className=" text-pGray max-w-210">
              Our spinning unit transforms carefully selected fibers into
              superior-quality <br /> yarns — the essential base for all our
              woven fabrics.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[65%] space-y-10">
              <div className="flex max-h-100 rounded-lg overflow-hidden">
                <Image
                  src="/spinning-unit.png"
                  alt="spinning unit image"
                  height={400}
                  width={1920}
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h1 className="font-bold text-tBlue text-3xl lg:text-4xl">
                  Spinning Unit is Equipped With modern Machinery
                </h1>
                <p className="text-pGray">
                  Our Spinning Unit is equipped with the most modern machinery
                  and state-of-the-art technology to produce premium-quality
                  yarns that meet international standards. From the careful
                  selection of raw cotton to the delivery of the final yarn,
                  every stage of production is meticulously supervised to ensure
                  uniformity, durability, and superior performance. We integrate
                  automated systems and real-time monitoring tools to enhance
                  production efficiency and reduce waste, ensuring optimal use
                  of raw materials. Our spinning process covers all essential
                  stages — blow room, carding, drawing, simplex, and ring
                  spinning — supported by advanced humidity and temperature
                  control systems to maintain fiber integrity. <br /> <br /> To
                  guarantee world-class quality, we implement stringent quality
                  assurance protocols at every stage of operation. Yarn samples
                  are regularly tested in our in-house laboratory using
                  international testing standards for parameters like yarn
                  strength, evenness, twist, and elongation. <br /> Backed by a
                  team of highly skilled professionals, we continuously strive
                  to innovate and improve production capabilities. Our flexible
                  setup allows us to produce a wide range of yarn counts and
                  blends tailored to the specific needs of our global clients
                  across the apparel and textile industries. <br /> At Momin
                  Textile Mills Ltd., we take great pride in our spinning
                  excellence — where technology meets craftsmanship. Every
                  strand of yarn we produce is a reflection of our commitment to
                  precision, quality, and trust, building a stronger foundation
                  for tomorrow&apos;s textiles.
                </p>
              </div>
            </div>
            <div className="space-y-10 w-full lg:w-[35%]">
              <CompanyProfileCard />
              <QuickLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default OurUnitsDescription;
