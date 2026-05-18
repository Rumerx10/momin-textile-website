// app/our-services/[serviceName]/page.jsx
"use client";
import { useParams } from "next/navigation";
import GeneralServices from "@/components/main/our-services/GeneralServices";
import ETP from "@/components/main/our-services/ETP";
import Lab from "@/components/main/our-services/Lab";

const page = () => {
  const { serviceName } = useParams();

  // Map service name to component
  if (serviceName === "general-services") {
    return (
      <GeneralServices
        title="Our Services"
        subTitle="We offer a comprehensive range of textile manufacturing services, including spinning, weaving, dyeing, finishing, and custom fabric development."
      />
    );
  }

  if (serviceName === "effluent-treatment-plant-etp") {
    return <ETP />;
  }

  if (serviceName === "our-laboratory") {
    return <Lab />;
  }

  // Default fallback
  return (
    <GeneralServices
      title="Our Services"
      subTitle="We offer a comprehensive range of textile manufacturing services."
    />
  );
};

export default page;
