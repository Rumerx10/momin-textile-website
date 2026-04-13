import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import OurIntegratedStrength from "./OurIntegratedStrength";

const Home = () => {
  return (
    <div className="pt-16 overflow-hidden">
      <Hero />
      <OurIntegratedStrength />
      <Features />
      <Services />
    </div>
  );
};

export default Home;
