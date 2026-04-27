import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Companies from "./Companies";
import CoreValues from "./CoreValues";
import SisterConcern from "./SisterConcern";
import OurUtilityService from "./OurUtilityService";
import OurIntegratedStrength from "./OurIntegratedStrength";
import QualityNSustainability from "./QualityNSustainability";
import ImageGallery from "../../ImageGallery";

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <OurIntegratedStrength />
      <AboutUs />
      <CoreValues />
      <SisterConcern />
      <QualityNSustainability />
      <OurUtilityService />
      <ImageGallery />
      <Companies />
    </div>
  );
};

export default Home;
