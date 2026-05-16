import OfficeCard from "../../cards/OfficeCard";
import { OfficeData } from "@/docs/data";

const Offices = () => {
  return (
    <div className="mt-20 container grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto py-8 md:py-12 lg:py-16">
      {OfficeData.data.slice(0, 3).map((office) => (
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
  );
};

export default Offices;