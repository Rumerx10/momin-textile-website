import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import OurIntegratedStrength from "./OurIntegratedStrength";
import AboutUs from "./AboutUs";
import CoreValues from "./CoreValues";
import SisterConcern from "./SisterConcern";
import QualityNSustainability from "./QualityNSustainability";

const Home = () => {
  return (
    <div className="pt-16 overflow-hidden">
      <Hero />
      <OurIntegratedStrength />
      <AboutUs />
      <CoreValues />
      <SisterConcern />
      <QualityNSustainability />
      <Features />
      <Services />
    </div>
  );
};

export default Home;
