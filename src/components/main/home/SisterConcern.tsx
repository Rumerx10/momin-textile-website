"use client";
import { useEffect, useState } from "react";
import { Building2, Shirt, Factory } from "lucide-react";
import { useFetchData } from "@/hooks/useApi";
import { GiClothes, GiClothesline, GiLoincloth } from "react-icons/gi";

const iconMap: Record<number, React.ComponentType<{ className?: string }>> = {
  0: Factory,
  1: Shirt,
  2: Building2,
  3: GiLoincloth,
  4: GiClothesline,
  5: GiClothes ,
};

const colors = [
  {
    linear: "from-blue-500 via-blue-400 to-cyan-400",
    light: "from-blue-500/15 to-cyan-500/15",
    border: "from-blue-400/50 to-cyan-400/30",
  },
  {
    linear: "from-purple-500 via-purple-400 to-pink-400",
    light: "from-purple-500/15 to-pink-500/15",
    border: "from-purple-400/50 to-pink-400/30",
  },
  {
    linear: "from-emerald-500 via-emerald-400 to-teal-400",
    light: "from-emerald-500/15 to-teal-500/15",
    border: "from-emerald-400/50 to-teal-400/30",
  },
  {
    linear: "from-orange-500 via-orange-400 to-amber-400",
    light: "from-orange-500/15 to-amber-500/15",
    border: "from-orange-400/50 to-amber-400/30",
  },
  {
    linear: "from-rose-500 via-rose-400 to-pink-400",
    light: "from-rose-500/15 to-pink-500/15",
    border: "from-rose-400/50 to-pink-400/30",
  },
  {
    linear: "from-indigo-500 via-indigo-400 to-blue-400",
    light: "from-indigo-500/15 to-blue-500/15",
    border: "from-indigo-400/50 to-blue-400/30",
  },
];

interface ConcernItem {
  id: number;
  cardHeading: string;
  shortParagraph: string;
  businessMotto: string;
  description: string;
  details: string;
  logo: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const SisterConcern = () => {
  const [concerns, setConcerns] = useState<ConcernItem[]>([]);

  // Fetch concerns data
  const { data: apiData, isLoading, error } = useFetchData(
    ["concerns"],
    "/concerns?page=1&limit=50&sortOrder=asc&isActive=true",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      // Sort by id in ascending order to show in correct order
      const sortedConcerns = [...apiData.data].sort((a, b) => a.id - b.id);
      setConcerns(sortedConcerns);
    }
  }, [apiData]);

  const IconComponent = (idx: number) => {
    const Icon = iconMap[idx % Object.keys(iconMap).length];
    return Icon;
  };

  // Split items into rows of 5
  const rows = [];
  for (let i = 0; i < concerns.length; i += 5) {
    rows.push(concerns.slice(i, i + 5));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-teal-800">
        <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-teal-800">
        <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
          <div className="text-center text-white">
            <p>Failed to load sister concerns. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-800">
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:gap-14 items-center">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl">
            <h4 className="font-bold text-3xl lg:text-4xl text-pYellow">
              Sister Concerns of Momin Group
            </h4>

            <p className="text-white text-lg">
              Expanding strength through diversified excellence. This integrated
              network enables Momin Group to deliver world-class products across
              local and international markets.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col items-center gap-5 w-full">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex flex-wrap justify-center gap-5 w-full items-stretch"
                >
                  {row.map((item, idx) => {
                    const actualIndex = rowIndex * 5 + idx;
                    const color = colors[actualIndex % colors.length];
                    const Icon = IconComponent(actualIndex);

                    return (
                      <div
                        key={item.id}
                        className={`
                          group relative rounded-3xl overflow-hidden
                          transition-all duration-500 ease-out
                          hover:scale-105 hover:-translate-y-3
                          w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(20%-1rem)]
                          min-w-50 lg:max-w-70 flex
                          h-full
                        `}
                      >
                        {/* Animated Background */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${color.linear} opacity-20 transition-opacity duration-500`}
                        />

                        {/* Main Glossy Card - Fixed height with flex column */}
                        <div
                          className={`
                            relative z-10
                            p-8 w-full
                            bg-linear-to-br ${color.light} 
                            backdrop-blur-2xl
                            border border-white/20
                            rounded-3xl
                            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                            group-hover:shadow-[0_8px_50px_0_rgba(31,38,135,0.5)]
                            flex flex-col
                            h-full
                            min-h-80
                          `}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 rounded-3xl opacity-100 transition-opacity duration-500">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-white/30 via-white/0 to-transparent rounded-3xl" />
                            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-white/10 via-transparent to-transparent rounded-full blur-3xl" />
                          </div>

                          {/* Border Glow */}
                          <div
                            className={`absolute inset-0 rounded-3xl bg-linear-to-r ${color.border} opacity-40 transition-opacity duration-500 blur-sm`}
                          />

                          {/* Content Wrapper - Flex column with space-between */}
                          <div className="relative z-20 flex flex-col items-center gap-4 flex-1">
                            {/* Icon Circle - Fixed size */}
                            <div
                              className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/30 shrink-0`}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Text Content - Flexible with fixed min height for description */}
                            <div className="space-y-2 flex-1 flex flex-col items-center justify-center w-full">
                              <p className="font-bold text-lg text-center text-white transition-colors line-clamp-2">
                                {item.cardHeading}
                              </p>
                              <div className="flex-1 flex items-center justify-center w-full">
                                <p className="text-center text-gray-300 text-sm line-clamp-3 px-2">
                                  {item.shortParagraph}
                                </p>
                              </div>
                            </div>

                            {/* Number Badge - Fixed at bottom */}
                            <div className="mt-auto pt-4 inline-flex items-center gap-2">
                              <span className="text-2xl font-bold bg-linear-to-r from-white/40 to-white/20 bg-clip-text text-transparent">
                                {String(actualIndex + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Outer Glow on Hover */}
                        <div
                          className={`absolute inset-0 rounded-3xl bg-linear-to-br ${color.linear} opacity-0 group-hover:opacity-10 -z-10 blur-xl transition-all duration-500 group-hover:scale-110`}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SisterConcern;