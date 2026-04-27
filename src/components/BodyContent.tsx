import React, { ReactNode } from "react";

const BodyContent = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children: ReactNode;
}) => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
            {title.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-pGray text-sm md:text-base max-w-3xl mx-auto">
            {subTitle.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < subTitle.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BodyContent;
