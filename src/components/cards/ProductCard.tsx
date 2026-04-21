import Image from "next/image";


const ProductCard = ({
  img,
  title,
  category,
}: {
  img: string;
  title: string;
  category: string;
}) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex h-54">
        <Image
          src={img}
          alt={title}
          height={216}
          width={369}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="py-3 space-y-2">
        <p className="text-sm text-pGray">{category}</p>
        <h3 className="font-bold text-tBlue text-xl">{title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
