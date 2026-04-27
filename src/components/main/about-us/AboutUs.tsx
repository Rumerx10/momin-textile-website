"use client";
import { useContext, useEffect } from "react";
import AboutUsDescription from "./AboutUsDescription";
import IntegratedME from "./IntegratedME";
import MeetOurMembers from "./MeetOurMembers";
import VideoContent from "./VideoContent";
import { HeroContext } from "@/src/context/HeroContext";
import ImageGallery from "../../ImageGallery";

const AboutUs = () => {
  const { setTitle } = useContext(HeroContext);

  useEffect(() => {
    setTitle(`Weaving Excellence. Delivering Trust. Let’s Know About Us`);
  }, [setTitle]);

  return (
    <div>
      <AboutUsDescription />
      <IntegratedME />
      <MeetOurMembers />
      <VideoContent />
      <ImageGallery />
    </div>
  );
};

export default AboutUs;
