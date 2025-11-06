import Heading from "@/components/atoms/Heading";
import { BROWSE_STYLES } from "@/constants/style-constants";
import en from "@messages/en.json";
import Image from "next/image";
import fetchImage from "@/utils/image-utils";

export default function BrowseStyle() {
  const labels = en.Sections.BrowseStyleLabels || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="bg-[#F2F0F1] rounded-[40px] py-12 px-8 sm:px-12 md:px-16 relative overflow-hidden">
          {/* Section Heading */}
          <Heading
            text={en.Sections.BrowseStyle}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10"
          />

          {/* Grid layout */}
          <div
            className="grid gap-5 max-w-5xl mx-auto
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3
                          auto-rows-fr"
          >
            {/* Card 1 - Casual */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white">
              <Image
                src={fetchImage(BROWSE_STYLES[0].image)}
                alt={BROWSE_STYLES[0].alt}
                fill
                className="object-top hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[0]}
              </h3>
            </div>

            {/* Card 2 - Formal */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white sm:col-span-2 lg:col-span-2">
              <Image
                src={fetchImage(BROWSE_STYLES[1].image)}
                alt={BROWSE_STYLES[1].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[1]}
              </h3>
            </div>

            {/* Card 3 - Party */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white sm:col-span-2 lg:col-span-2">
              <Image
                src={fetchImage(BROWSE_STYLES[3].image)}
                alt={BROWSE_STYLES[3].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[3]}
              </h3>
            </div>

            {/* Card 4 - Gym */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white">
              <Image
                src={fetchImage(BROWSE_STYLES[2].image)}
                alt={BROWSE_STYLES[2].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[2]}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
