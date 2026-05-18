import { ReactNode } from "react";

interface BodyContentProps {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}

const BodyContent = ({ title, subTitle, children }: BodyContentProps) => {
  // Helper function to format text with line breaks
  const formatTextWithLineBreaks = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 justify-center items-center ">
        <div className="space-y-4 text-center max-w-4xl">
          <h4 className="font-bold text-center text-pBlue text-2xl md:text-3xl lg:text-4xl">
            {formatTextWithLineBreaks(title)}
          </h4>
          {subTitle && (
            <p className="text-pGray text-sm md:text-base max-w-3xl mx-auto">
              {formatTextWithLineBreaks(subTitle)}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default BodyContent;
