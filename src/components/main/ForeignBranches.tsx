"use client";
import { useContext, useEffect, useState } from "react";
import BodyContent from "../BodyContent";
import { HeroContext } from "@/context/HeroContext";
import { OfficeData } from "@/docs/data";
import OfficeCard from "../cards/OfficeCard";

const ForeignBranches = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: officesData, metadata } = OfficeData;
  const itemsPerPage = metadata.itemPerPage;
  const totalPages = metadata.totalPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOffices = officesData.slice(startIndex, endIndex);

  useEffect(() => {
    setTitle("Contact Us");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <BodyContent
        title="Let's connect with us globally"
        subTitle="At Momin Textile Mills Ltd, we believe in creating strong global connections built on trust, transparency, and shared growth."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentOffices.map((office) => (
            <OfficeCard
              key={office.id}
              name={office.name}
              type={office.type}
              address={office.address}
              phones={office.phones}
              emails={office.emails}
              mapLink={office.mapLink}
              isMainOffice={office.isMainOffice}
            />
          ))}
        </div>
      </BodyContent>
    </div>
  );
};

export default ForeignBranches;
