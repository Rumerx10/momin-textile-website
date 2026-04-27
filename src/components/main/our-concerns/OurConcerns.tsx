"use client";

import OurConcernCard from "@/src/components/cards/OurConcernCard";
import { HeroContext } from "@/src/context/HeroContext";
import { useContext, useEffect } from "react";

const OurConcerns = () => {
  const sisterConcerns = [
    {
      id: 1,
      title: "Momin Textile Mills Limited",
      desc: "Fabric weaving Unit - Established in 1986, a large contribution in manufacturing and economic.",
    },
    {
      id: 2,
      title: "Momin Spinning Mills Limited",
      desc: "Yarn manufacturing Unit - Established in 2007, with advanced technology and strict quality control.",
    },
    {
      id: 3,
      title: "Momin Textile Mills LTD (Unit-2)",
      desc: "Woven Dyeing & Finishing Unit - Established in 2022, equipped with advanced machinery.",
    },
    {
      id: 4,
      title: "Masud Textile",
      desc: "Established in 1994, with a strong emphasis on innovation, craftsmanship, and sustainability.",
    },
  ];

  const { setTitle } = useContext(HeroContext);
  useEffect(() => {
    setTitle("Our Concerns");
  }, [setTitle]);

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
            Sister Concern of Momin Group
          </h1>
          <p className="text-pGray text-sm md:text-base max-w-3xl mx-auto">
            MOMIN GROUP, a large contribution in manufacturing and economic
            development of Bangladesh.
            <br />
            MOMIN GROUP is a privately owned company.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sisterConcerns.map((concern) => (
            <OurConcernCard
              key={concern.id}
              title={concern.title}
              desc={concern.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurConcerns;
