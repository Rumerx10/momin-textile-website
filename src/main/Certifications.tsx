// app/certifications/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/src/context/HeroContext";
import Pagination from "@/src/components/Pagination";
import CertificateCard from "../components/cards/CertificateCard";

// Certification Data with metadata pattern
const CertificationsData = {
  metadata: {
    total: 8,
    itemPerPage: 4,
    totalPage: 2,
    currentPage: 1,
  },
  data: [
    {
      id: 1,
      img: "/certificate1.png",
      subTitle: "Organic 100",
      title: "Content Standard",
      desc: "From our state-of-the-art manufacturing facilities to our dedicated team of professionals, every aspect of our operation reflects a passion for quality and a commitment to excellence. Over the years, we have evolved into a fully integrated textile manufacturing enterprise, capable of handling the entire production process — from spinning and dyeing to weaving, finishing, and packaging — ensuring precision and consistency at every stage. Momin Textile Mills Ltd is a distinguished name in Bangladesh's thriving textile industry — a company that has grown from humble beginnings into one of the most reliable manufacturers and exporters of woven fabrics for global apparel brands. Since its inception, Momin Textile has been driven by one core philosophy: to blend innovation, craftsmanship, and integrity into every thread we produce.",
    },
    {
      id: 2,
      img: "/certificate2.png",
      subTitle: "OEKO TEX®",
      title: "Standard 100",
      desc: "From our state-of-the-art manufacturing facilities to our dedicated team of professionals, every aspect of our operation reflects a passion for quality and a commitment to excellence. Over the years, we have evolved into a fully integrated textile manufacturing enterprise, capable of handling the entire production process — from spinning and dyeing to weaving, finishing, and packaging — ensuring precision and consistency at every stage. Momin Textile Mills Ltd is a distinguished name in Bangladesh's thriving textile industry — a company that has grown from humble beginnings into one of the most reliable manufacturers and exporters of woven fabrics for global apparel brands.",
    },
    {
      id: 3,
      img: "/certificate3.png",
      subTitle: "Organic Blended",
      title: "Content Standard",
      desc: "Since its inception, Momin Textile has been driven by one core philosophy: to blend innovation, craftsmanship, and integrity into every thread we produce. From our state-of-the-art manufacturing facilities to our dedicated team of professionals, every aspect of our operation reflects a passion for quality and a commitment to excellence. Over the years, we have evolved into a fully integrated textile manufacturing enterprise, capable of handling the entire production process — from spinning and dyeing to weaving, finishing, and packaging — ensuring precision and consistency at every stage.",
    },
    {
      id: 4,
      img: "/certificate4.png",
      subTitle: "Recycled Blended",
      title: "Claim Standard",
      desc: "From our state-of-the-art manufacturing facilities to our dedicated team of professionals, every aspect of our operation reflects a passion for quality and a commitment to excellence. Over the years, we have evolved into a fully integrated textile manufacturing enterprise, capable of handling the entire production process — from spinning and dyeing to weaving, finishing, and packaging — ensuring precision and consistency at every stage. Momin Textile Mills Ltd is a distinguished name in Bangladesh's thriving textile industry — a company that has grown from humble beginnings into one of the most reliable manufacturers and exporters of woven fabrics for global apparel brands.",
    },
    {
      id: 5,
      img: "/certificate5.png",
      subTitle: "Global Recycled",
      title: "Standard (GRS)",
      desc: "Our commitment to sustainability is validated through the Global Recycled Standard certification. We ensure traceability and responsible production of recycled materials throughout our manufacturing process, from sourcing to final product delivery. Every aspect of our operation reflects a passion for quality and a commitment to excellence.",
    },
    {
      id: 6,
      img: "/certificate6.png",
      subTitle: "ISO 9001",
      title: "Quality Management",
      desc: "Our quality management system meets international standards, ensuring consistent product quality, continuous improvement, and customer satisfaction across all our manufacturing operations. We have evolved into a fully integrated textile manufacturing enterprise.",
    },
    {
      id: 7,
      img: "/certificate7.png",
      subTitle: "ISO 14001",
      title: "Environmental Management",
      desc: "We are committed to minimizing our environmental impact through effective environmental management systems, waste reduction, and sustainable resource utilization throughout our production process.",
    },
    {
      id: 8,
      img: "/certificate8.png",
      subTitle: "Higg Index",
      title: "Facility Environmental Module",
      desc: "Our facility's environmental performance is assessed through the Higg Index, demonstrating our commitment to sustainable practices and continuous environmental improvement across all operations.",
    },
  ],
};

const Certifications = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: certificationsData, metadata } = CertificationsData;
  const itemsPerPage = metadata.itemPerPage;
  const totalPages = metadata.totalPage;

  // Calculate pagination for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = certificationsData.slice(startIndex, endIndex);

  useEffect(() => {
    setTitle("Certifications");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-3 text-center">
          <h1 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
            Certifications
          </h1>
          <p className="text-pGray text-sm md:text-base max-w-3xl mx-auto">
            At Momin Textile Mills Ltd, we maintain the highest levels of
            quality, safety, and sustainability through internationally
            recognized certifications.
          </p>
        </div>

        {/* Certifications List with Pagination */}
        <div className="w-full">
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            {currentItems.map((cert, idx) => (
              <div
                key={cert.id}
                className={`${
                  idx !== currentItems.length - 1
                    ? "border-b border-gray-200 pb-8 md:pb-10 lg:pb-12"
                    : ""
                }`}
              >
                <CertificateCard
                  img={cert.img}
                  subTitle={cert.subTitle}
                  title={cert.title}
                  desc={cert.desc}
                />
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <div className="mt-10 md:mt-12 lg:mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
