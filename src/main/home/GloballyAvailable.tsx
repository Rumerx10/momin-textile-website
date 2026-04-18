import Image from "next/image";
import Link from "next/link";

const GloballyAvailable = () => {
  return (
    <div className="py-8 sm:py-12 md:py-16 flex items-center justify-center bg-tBlue min-h-100 sm:min-h-125 md:min-h-150">
      <div className="relative container mx-auto px-4 sm:px-6 flex items-center justify-center">
        {/* Background Image */}
        <div className="relative w-full h-75 sm:h-100 md:h-125 lg:h-150">
          <Image
            src="/globe.png"
            alt="globeMap"
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center text-white max-w-[90%] sm:max-w-[80%] md:max-w-150 lg:max-w-190">
            <h2 className="mb-2 sm:mb-3 md:mb-4 font-semibold text-3xl lg:text-4xl">
              Globally We Are Available
            </h2>

            <p className="text-sm sm:text-base md:text-lg px-2 sm:px-4">
              MOMIN GROUP, a large contribution in manufacturing and economic
              development of Bangladesh. MOMIN GROUP is a privately
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
              <Link
                href="/#"
                className="inline-block text-tBlue font-semibold px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 bg-white rounded-sm hover:bg-gray-100 transition duration-300 text-sm sm:text-base"
              >
                See Our Global Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GloballyAvailable;
