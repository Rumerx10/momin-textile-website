"use client";
import Offices from "./Offices";
import ContactForm from "./ContactForm";
import { useContext, useEffect } from "react";
import { HeroContext } from "@/context/HeroContext";
import PreferDirectApproach from "./PreferDirectApproach";

const ContactUs = () => {
  const { setTitle } = useContext(HeroContext);

  useEffect(() => {
    setTitle(`Contact Us`);
  }, [setTitle]);
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-25">
        <PreferDirectApproach />
        <ContactForm />
      </div>
      <Offices />
    </div>
  );
};

export default ContactUs;
