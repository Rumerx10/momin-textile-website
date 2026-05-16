import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const QuickLinksData = [
  {
    label: "Our Products",
    link: "/our-products",
  },
  {
    label: "Our Services",
    link: "/our-services",
  },
  {
    label: "Media Gallery",
    link: "/media-gallery",
  },
  {
    label: "News & Events",
    link: "/news-events",
  },
];
const QuickLinks = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="border-b border-bdrGray text-pGray w-full">
        <div className="font-semibold text-xl text-pBlue mb-4">Quick Links</div>
      </div>
      <div className="space-y-4">
        {QuickLinksData.map((item,idx) => (
          <div key={idx} className="border-b cursor-pointer group duration-300 border-bdrGray text-pGray hover:text-pBlue w-full">
            <Link href={item.link}>
              <div className="font-medium mb-4 flex items-center gap-3">
                <p> {item.label}</p>
                <div className="opacity-0 group-hover:opacity-100">
                  <FaArrowRightLong />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
