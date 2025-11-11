import Heading from "@/components/atoms/Heading";
import { BROWSE_STYLES } from "@/constants/style-constants";
import en from "@messages/en.json";
import Image from "next/image";
import Link from "next/link";
import fetchImage from "@/utils/image-utils";

export default function BrowseStyle() {
  const labels = en.Sections.BrowseStyleLabels || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="bg-[#F2F0F1] rounded-[40px] py-12 px-8 sm:px-12 md:px-16 relative overflow-hidden">
          <Heading
            text={en.Sections.BrowseStyle}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10"
          />

          <div
            className="grid gap-5 max-w-5xl mx-auto
                          grid-cols-1 
                          lg:grid-cols-3
                          auto-rows-fr"
          >
            <Link
              href="/category?style=Casual"
              className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white lg:h-[320px] cursor-pointer group"
            >
              <Image
                src={fetchImage(BROWSE_STYLES[0].image)}
                alt={BROWSE_STYLES[0].alt}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[0]}
              </h3>
            </Link>

            <Link
              href="/category?style=Formal"
              className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white lg:col-span-2 lg:h-[320px] cursor-pointer group"
            >
              <Image
                src={fetchImage(BROWSE_STYLES[1].image)}
                alt={BROWSE_STYLES[1].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[1]}
              </h3>
            </Link>

            <Link
              href="/category?style=Party"
              className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white lg:col-span-2 lg:h-[320px] cursor-pointer group"
            >
              <Image
                src={fetchImage(BROWSE_STYLES[3].image)}
                alt={BROWSE_STYLES[3].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[3]}
              </h3>
            </Link>

            <Link
              href="/category?style=Gym"
              className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] bg-white lg:h-[320px] cursor-pointer group"
            >
              <Image
                src={fetchImage(BROWSE_STYLES[2].image)}
                alt={BROWSE_STYLES[2].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="absolute top-6 left-6 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight z-10">
                {labels[2]}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
