import CompanyProfileCard from "@/components/CompanyProfileCard";
import QuickLinks from "@/components/QuickLinks";

const AboutUsDescription = ({ about }: { about: string }) => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[65%] space-y-10">
            <div dangerouslySetInnerHTML={{ __html: about }} />
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
