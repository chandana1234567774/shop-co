import Heading from "@/components/atoms/Heading";
import { BROWSE_STYLES } from "@/constants/style-constants";
import en from "@messages/en.json";
import Image from "next/image";
import fetchImage from "@/utils/image-utils";

export default function BrowseStyle() {
  const labels = en.Sections.BrowseStyleLabels || [];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="bg-[#F2F0F1] rounded-[40px] py-14 px-8 sm:px-12 md:px-16 relative overflow-hidden">
          {/* Section Heading */}
          <Heading
            text={en.Sections.browseStyle}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-12"
          />

          {/* Grid layout */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 items-center mb-12">
            {/* === Card 1 === */}
            <div className="relative rounded-2xl overflow-hidden w-[85%] h-[280px] sm:h-[300px] md:h-[340px] justify-self-start">
              <Image
                src={fetchImage(BROWSE_STYLES[0].image)}
                alt={BROWSE_STYLES[0].alt}
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black font-integral text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {labels[0]}
              </h3>
            </div>

            {/* === Card 2 === */}
            <div className="relative rounded-2xl overflow-hidden w-[108%] h-[280px] sm:h-[300px] md:h-[340px] justify-self-end">
              <Image
                src={fetchImage(BROWSE_STYLES[1].image)}
                alt={BROWSE_STYLES[1].alt}
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black font-integral text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {labels[1]}
              </h3>
            </div>

            {/* === Card 3 === */}
            <div className="relative rounded-2xl overflow-hidden w-[125%] h-[250px] sm:h-[300px] md:h-[340px] justify-self-start">
              <Image
                src={fetchImage(BROWSE_STYLES[3].image)}
                alt={BROWSE_STYLES[3].alt}
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black font-integral text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {labels[2]}
              </h3>
            </div>

            {/* === Card 4 === */}
            <div className="relative rounded-2xl overflow-hidden w-[78%] h-[250px] sm:h-[300px] md:h-[340px] justify-self-end">
              <Image
                src={fetchImage(BROWSE_STYLES[2].image)}
                alt={BROWSE_STYLES[2].alt}
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black font-integral text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {labels[3]}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
