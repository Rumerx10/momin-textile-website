"use client";
import { HeroContext } from "@/context/HeroContext";
import { useContext, useEffect, useState } from "react";
import { FaTshirt, FaMagic } from "react-icons/fa";
import { GiCottonFlower, GiMaterialsScience } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";

const OurProductRange = () => {
  const { setTitle } = useContext(HeroContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTitle("Our Product Range");
  }, [setTitle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    const ref = document.getElementById("product-range-section");
    if (ref) observer.observe(ref);

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      name: "100% Cotton Fabrics",
      icon: <GiCottonFlower className="text-3xl md:text-4xl" />,
      description:
        "Premium quality cotton fabrics with exceptional softness and durability.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      features: ["Breathable", "Eco-friendly", "Soft texture"],
    },
    {
      name: "TC Poly-Cotton Fabrics",
      icon: <GiMaterialsScience className="text-3xl md:text-4xl" />,
      description:
        "Perfect blend of polyester and cotton for strength and comfort.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      features: ["Wrinkle resistant", "Durable", "Easy care"],
    },
    {
      name: "Twill Fabrics",
      icon: <FaTshirt className="text-3xl md:text-4xl" />,
      description:
        "Diagonal weave pattern fabrics known for their strength and texture.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      features: ["High durability", "Distinct texture", "Versatile use"],
    },
    {
      name: "Pocketing Fabrics",
      icon: <RiPlantFill className="text-3xl md:text-4xl" />,
      description: "Specialized fabrics for pocket lining with smooth finish.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      features: ["Smooth finish", "Tear resistant", "Colorfast"],
    },
    {
      name: "Custom Developments",
      icon: <FaMagic className="text-3xl md:text-4xl" />,
      description: "Tailor-made fabric solutions for your unique requirements.",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      features: ["Custom blends", "Special finishes", "Unique designs"],
    },
  ];

  return (
    <div
      id="product-range-section"
      className="bg-linear-to-br from-gray-50 via-white to-gray-50 py-16 md:py-20 lg:py-24"
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <h4 className="font-bold text-pBlue text-3xl lg:text-4xl">
              Our Product Range
            </h4>

            <div className="w-24 h-1 bg-linear-to-r from-pBlue to-pBlue/40 mx-auto rounded-full"></div>

            <p className="text-pGray max-w-2xl mx-auto text-sm md:text-base">
              Discover our diverse collection of high-quality textile products,
              crafted with precision and passion for global markets.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 auto-rows-fr">
            {products.map((product, index) => {
              const isLast = index === products.length - 1;

              return (
                <div
                  key={index}
                  className={`
                    w-full transition-all duration-500
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                    
                    ${isLast ? "col-span-2 lg:col-span-1 justify-self-center max-w-sm" : ""}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`
                      ${product.bgColor}
                      rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6
                      shadow-lg hover:shadow-2xl
                      border border-gray-100 hover:border-transparent
                      flex flex-col h-full
                      hover:-translate-y-2 transition-all duration-300
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`${product.iconColor} mb-4 flex justify-center`}
                    >
                      {product.icon}
                    </div>

                    {/* Title */}
                    <h6 className="font-bold text-pBlue text-base md:text-lg lg:text-xl mb-2 text-center">
                      {product.name}
                    </h6>

                    {/* Description */}
                    <p className="text-pGray text-xs md:text-sm mb-3 text-center hidden lg:block">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1 mt-auto">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-center gap-2"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${product.color}`}
                          />
                          <span className="text-pGray/70 text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProductRange;
