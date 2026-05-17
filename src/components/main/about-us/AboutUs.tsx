// app/about-us/page.jsx
"use client";
import { useContext, useEffect, useState } from "react";
import AboutUsDescription from "./AboutUsDescription";
import IntegratedME from "./IntegratedME";
import MeetOurMembers from "./MeetOurMembers";
import VideoContent from "./VideoContent";
import ImageGallery from "../../ImageGallery";
import { HeroContext } from "@/context/HeroContext";
import { useFetchData } from "@/hooks/useApi";
import AboutUsDescriptionSkeleton from "./AboutUsDescriptionSkeleton";

const AboutUs = () => {
  const { setTitle } = useContext(HeroContext);
  const [aboutData, setAboutData] = useState(null);

  // Fetch about us data
  const { data: apiData, isLoading } = useFetchData(["about-us"], "/about-us", {
    enabled: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (apiData?.data) {
      setAboutData(apiData.data);
      setTitle(apiData.data.heading || "About Us");
    }
  }, [apiData, setTitle]);

  if (isLoading) {
    return <AboutUsDescriptionSkeleton />;
  }

  return (
    <div>
      <AboutUsDescription about={apiData.data.about} />
      <IntegratedME aboutData={aboutData} />
      <MeetOurMembers />
      <VideoContent />
      <ImageGallery />
    </div>
  );
};

export default AboutUs;
