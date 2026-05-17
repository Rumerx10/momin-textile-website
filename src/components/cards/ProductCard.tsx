// components/cards/ProductCard.jsx
"use client";
import Image from "next/image";

interface ProductCardProps {
  img: string;
  title: string;
  desc: string;
}

const ProductCard = ({ img, title, desc }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h5 className="font-bold text-pBlue text-lg mb-2 line-clamp-1">
          {title}
        </h5>
        <p className="text-pGray text-sm line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;