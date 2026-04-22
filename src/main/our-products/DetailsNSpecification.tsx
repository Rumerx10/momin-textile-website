import  { useState } from "react";

const DetailsNSpecification = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="py-8 md:py-12 lg:py-16">
      <div className="container px-4 mx-auto space-y-6">
        <div className="flex border-b-2 border-bdrGray">
          <div
            onClick={() => setActiveTab("details")}
            className={`font-bold px-8 py-4 bg-pBlue duration-300 ${activeTab == "details" ? "bg-pBlue font-bold text-white" : "text-pGray font-medium bg-white"} cursor-pointer`}
          >
            Details About Product
          </div>
          <div
            onClick={() => setActiveTab("specifications")}
            className={`px-8 py-4 bg-pBlue duration-300 ${activeTab == "specifications" ? "bg-pBlue font-bold text-white" : "text-pGray font-medium bg-white"} cursor-pointer`}
          >
            Specifications
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-3xl lg:text-4xl text-pBlue">
            Details About Product
          </h3>
          <p className="text-pGray text-justify">
            Printers in the 1500s scrambled the words from Cicero's "De Finibus
            Bonorum et Malorum'' after mixing the words in each sentence. The
            familiar "lorem ipsum dolor sit amet" text emerged when 16th-century
            printers adapted Cicero's original work, beginning with the phrase
            "dolor sit amet consectetur." They abbreviated "dolorem" (meaning
            "pain") to "lorem," which carries no meaning in Latin. "Ipsum"
            translates to "itself," and the text frequently includes phrases
            such as "consectetur adipiscing elit" and "ut labore et dolore."
            These Latin fragments, derived from Cicero's philosophical treatise,
            were rearranged to create the standard dummy text that has become a
            fundamental tool in design and typography across generations. The
            short answer is that lorem ipsum text doesn't actually "say"
            anything meaningful. It's deliberately scrambled Latin that doesn't
            form coherent sentences. While it comes from Cicero's "De Finibus
            Bonorum et Malorum," the text has been modified so extensively that
            it's nonsensical. Why scrambled text? That's exactly the point. By
            using text that's unreadable but maintains the general pattern of
            regular writing — including normal word length, spacing, and
            punctuation — designers can focus on the visual elements of a layout
            without the actual content getting in the way. The pseudo-Latin
            appearance gives it a natural feel while ensuring it won't distract
            from the design itself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsNSpecification;
