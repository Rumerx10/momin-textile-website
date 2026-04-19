import ImageGallery from "../../components/ImageGallery";
import AboutUsDescription from "./AboutUsDescription";
import IntegratedME from "./IntegratedME";
import MeetOurMembers from "./MeetOurMembers";
import VideoContent from "./VideoContent";

const AboutUs = () => {
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
