"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

const ConcernDetails = () => {
  const swiperRef = useRef<SwiperType>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "/p1.png",
      title: "Momin Textile Mills LTD (Unit-2)",
      description:
        "A large contribution in manufacturing and economic development of Bangladesh, a large corporation in manufacturing and economic development of Bangladesh.",
    },
    {
      image: "/p2.png",
      title: "Sister Concern Short Details / Business Mode",
      description:
        "A large contribution in manufacturing and economic development of Bangladesh, a large corporation in manufacturing and economic development of Bangladesh.",
    },
    {
      image: "/p3.png",
      title: "Advanced Manufacturing Unit",
      description:
        "State-of-the-art facilities for textile production and quality control.",
    },
    {
      image: "/p4.png",
      title: "Production Excellence",
      description:
        "Committed to delivering the highest quality textile products.",
    },
    {
      image: "/p5.png",
      title: "Infrastructure Development",
      description: "Modern infrastructure supporting sustainable operations.",
    },
    {
      image: "/p6.png",
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes.",
    },
    {
      image: "/p7.png",
      title: "Innovation Center",
      description: "Dedicated to advancing textile technology.",
    },
    {
      image: "/p8.png",
      title: "Workforce Development",
      description: "Investing in skilled professionals and training.",
    },
    {
      image: "/p9.png",
      title: "Supply Chain Management",
      description: "Efficient logistics and distribution network.",
    },
    {
      image: "/p10.png",
      title: "Environmental Commitment",
      description: "Sustainable practices for a better future.",
    },
    {
      image: "/p11.png",
      title: "Export Operations",
      description: "Global reach with international standards.",
    },
    {
      image: "/p12.png",
      title: "Strategic Vision",
      description: "Leading the textile industry into the future.",
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <div className="bg-white">
      {/* Carousel Section */}
      <div className="border-2 border-red-500 flex flex-col lg:flex-row items-stretch lg:max-h-110">
        {/* Carousel Container */}
        <div className="flex-1 relative bg-gray-100 min-h-96">
          Carousel Container
        </div>

        {/* Info Panel */}
        <div className="h-full flex-1 bg-slate-900 text-white p-8 flex flex-col justify-center min-h-96">
          <h3 className="text-2xl font-semibold mb-4">
            Momin Textile Mills LTD (Unit-2)
          </h3>
          <p className="">
            a large contribution in manufacturing and economic development of
            Bangladesh. a large contribution in manufacturing and economic
            development of Bangladesh.
          </p>
          <div className="w-full h-0.5 bg-white my-5"></div>
          <div className="">
            <h3 className="font-semibold mb-2">
              Sister Concern Short Details / Business Moto
            </h3>
            <p>
              a large contribution in manufacturing and economic development
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-4 py-12 mx-auto">
        <h2 className="text-pBlue text-3xl lg:text-4xl font-bold mb-8">
          Momin Textile Mills Ltd is a distinguished name in Bangladesh&apos;s
          thriving textile industry
        </h2>

        <div className="space-y-6 text-pGray text-justify">
          <p>
            Momin Textile Mills Ltd is a distinguished name in Bangladesh&apos;s
            thriving textile industry – a company that has grown from humble
            beginnings into one of the most reliable manufacturers and exporters
            of woven fabrics for global apparel brands. Since its inception,
            Momin Textile has been driven by one core philosophy: to blend
            innovation, craftsmanship, and integrity into every thread we
            produce.
          </p>

          <p>
            From our state-of-the-art manufacturing facilities to our dedicated
            team of professionals, every aspect of our operation reflects a
            passion for quality and a commitment to excellence. Over the years,
            we have evolved into a fully integrated textile manufacturing
            enterprise, capable of handling the entire production process – from
            spinning and dyeing to weaving, finishing, and packaging – ensuring
            precision and consistency at every stage.
          </p>

          <p>
            Momin Textile Mills Ltd is a distinguished name in Bangladesh&apos;s
            thriving textile industry – a company that has grown from humble
            beginnings into one of the most reliable manufacturers and exporters
            of woven fabrics for global apparel brands. Since its inception,
            Momin Textile has been driven by one core philosophy: to blend
            innovation, craftsmanship, and integrity into every thread we
            produce. From our state-of-the-art manufacturing facilities to our
            dedicated team of professionals, every aspect of our operation
            reflects a passion for quality and a commitment to excellence. Over
            the years, we have evolved into a fully integrated textile
            manufacturing enterprise, capable of handling the entire production
            process – from spinning and dyeing to weaving, finishing, and
            packaging – ensuring precision and consistency at every stage.
          </p>

          <p>
            Momin Textile Mills Ltd is a distinguished name in Bangladesh&apos;s
            thriving textile industry – a company that has grown from humble
            beginnings into one of the most reliable manufacturers and exporters
            of woven fabrics for global apparel brands. Since its inception,
            Momin Textile has been driven by one core philosophy: to blend
            innovation, craftsmanship, and integrity into every thread we
            produce.
          </p>
        </div>

        {/* People Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-pBlue text-xl font-bold mb-6">
            Our People: The Strength Behind Every Thread
          </h3>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="text-pGray text-justify">
              Behind every meter of fabric we produce is a team of passionate
              individuals – engineers, designers, quality controllers, and
              machine operators – all working in perfect harmony to deliver the
              best. Our people are our most valuable asset. Momin Textile Mills
              Ltd is distinguished name in Bangladesh&apos;s thriving textile
              industry.
            </p>
          </div>

          <div className="space-y-6 text-pGray text-justify">
            <p>
              Momin Textile Mills Ltd is a distinguished name in
              Bangladesh&apos;s thriving textile industry – a company that has
              grown from humble beginnings into one of the most reliable
              manufacturers and exporters of woven fabrics for global apparel
              brands. Since its inception, Momin Textile has been driven by one
              core philosophy: to blend innovation, craftsmanship, and integrity
              into every thread we produce.
            </p>

            <p>
              Momin Textile Mills Ltd is a distinguished name in
              Bangladesh&apos;s thriving textile industry – a company that has
              grown from humble beginnings into one of the most reliable
              manufacturers and exporters of woven fabrics for global apparel
              brands. Since its inception, Momin Textile has been driven by one
              core philosophy: to blend innovation, craftsmanship, and integrity
              into every thread we produce. From our state-of-the-art
              manufacturing facilities to our dedicated team of professionals,
              every aspect of our operation reflects a passion for quality and a
              commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernDetails;
