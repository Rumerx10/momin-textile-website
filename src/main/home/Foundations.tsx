
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Foundations = () => {
  const Data = [
    {img:"/assets/Home/SisterConcernsLogo/Frame 615.png", link:"/sister-concerns/kems-fashions-ltd"},
    {img:"/assets/Home/SisterConcernsLogo/Frame 616.png", link:"/sister-concerns/kashfi-knit-wares-ltd"},
    {img:"/assets/Home/SisterConcernsLogo/Frame 617.png", link:"/sister-concerns/kashfi-knit-ltd"},
    {img:"/assets/Home/SisterConcernsLogo/Frame 618.png", link:"/sister-concerns/ali-garments-ltd"},
    {img:"/assets/Home/SisterConcernsLogo/Frame 619.png", link:"/sister-concerns/admiral-denim-washing-ltd"},
    {img:"/assets/Home/SisterConcernsLogo/Frame 620.png", link:"/sister-concerns/kashfi-screen-printing"},
    {img:"/assets/Home/SisterConcernsLogo/Frame 621.png", link:"/sister-concerns/kashfi-knit-composite"},
  ];

  return (
    <div className="flex items-center justify-center bg-bgBlack py-20 px-5">
      <div className="flex flex-col items-center gap-0 lg:gap-20 w-full max-w-[1536px]">
        <div className="flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-white text-2xl md:text-4xl font-bold">
              Foundations of Our Strength
            </h2>
            <h1 className="text-textBlue text-3xl md:text-5xl font-bold">
              Meet Our Sister Concerns
            </h1>            
          </div>
          <p className="text-textGray text-lg">
            Each of our sister concerns plays a vital role in shaping Kems Group’s reputation for excellence, delivering unmatched quality and innovation to the <br/> global apparel industry. Explore their unique contributions and discover the expertise behind our success.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 items-center justify-center w-full mx-auto pt-10">
          {Data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[160px] lg:w-full lg:max-w-[250px]"
            >
              <Link href={item.link}>
                <Image src={item.img} alt="sister concerns" 
                height={220} width={250} 
                className="object-cover w-full" />    
              </Link>                        
            </motion.div>
          ))}
        </div>        
      </div>
    </div>
  );
};

export default Foundations;
