import CompanyProfileCard from "@/src/components/CompanyProfileCard";
import QuickLinks from "@/src/components/QuickLinks";

const AboutUsDescription = () => {
  return (
    <div className="container px-4 mx-auto py-16">
      <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[65%] space-y-10">
            <h1 className="font-bold text-tBlue text-3xl lg:text-4xl">
              Momin Textile Mills Ltd is a Distinguished Name in
              Bangladesh&apos;s Thriving Textile Industry
            </h1>
            <div className="space-y-10">
              <p className=" text-pGray">
                Momin Textile Mills Ltd is a distinguished name in
                Bangladesh&apos;s thriving textile industry — a company that has
                grown from humble beginnings into one of the most reliable
                manufacturers and exporters of woven fabrics for global apparel
                brands. Since its inception, Momin Textile has been driven by
                one core philosophy: to blend innovation, craftsmanship, and
                integrity into every thread we produce. <br /> <br /> From our
                state-of-the-art manufacturing facilities to our dedicated team
                of professionals, every aspect of our operation reflects a
                passion for quality and a commitment to excellence. Over the
                years, we have evolved into a fully integrated textile
                manufacturing enterprise, capable of handling the entire
                production process — from spinning and dyeing to weaving,
                finishing, and packaging — ensuring precision and consistency at
                every stage.
              </p>
              <div className="bg-[#E8EAEE] rounded-lg space-y-4 p-4">
                <h3 className="font-semibold text-xl text-tBlue">
                  Our People: The Strength Behind Every Thread
                </h3>
                <p className="text-pGray">
                  Behind every meter of fabric we produce is a team of
                  passionate individuals — engineers, designers, quality
                  controllers, and machine operators — all working together with
                  one goal: to deliver the best. Our people are our most
                  valuable asset. Momin Textile Mills Ltd.
                </p>
              </div>
              <p className=" text-pGray">
                Momin Textile Mills Ltd is a distinguished name in
                Bangladesh&apos;s thriving textile industry — a company that has
                grown from humble beginnings into one of the most reliable
                manufacturers and exporters of woven fabrics for global apparel
                brands. Since its inception, Momin Textile has been driven by
                one core philosophy: to blend innovation, craftsmanship, and
                integrity into every thread we produce. <br /> <br /> From our
                state-of-the-art manufacturing facilities to our dedicated team
                of professionals, every aspect of our operation reflects a
                passion for quality and a commitment to excellence. Over the
                years, we have evolved into a fully integrated textile
                manufacturing enterprise, capable of handling the entire
                production process — from spinning and dyeing to weaving,
                finishing, and packaging — ensuring precision and consistency at
                every stage.
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
  );
};

export default AboutUsDescription;
