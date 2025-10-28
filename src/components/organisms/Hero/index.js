"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";

export default function Hero() {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    import("../../../../messages/en.json")
      .then((data) => setMessages(data.default))
      .catch((err) => console.error("Error loading messages:", err));
  }, []);

  // ✅ Correct key names
  const hero = messages.Hero || {};
  const brands = messages.BrandsBar || {};

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#F2F0F1]">
      {/* ✅ Background Image */}
      <div className="hidden lg:block absolute right-0 top-[-50px] bottom-0 w-full">
        <Image
          src={fetchImage(IMAGES.HERO)}
          alt={hero.BackgroundAlt || "Background"}
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-28 pb-36">
          <div className="max-w-full md:max-w-[580px]">
            {/* Headline */}
            <h1 className="text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-black text-black leading-[1.1] mb-6">
              <span className="block">{hero.HeadlineLine1}</span>
              <span className="block">{hero.HeadlineLine2}</span>
              <span className="block">{hero.HeadlineLine3}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-[545px]">
              {hero.SubheadlineLine1} {hero.SubheadlineLine2}
            </p>

            {/* Button */}
            <Button className="px-10 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 mb-8">
              {hero.Button}
            </Button>

            {/* Below Button Image */}
            <div className="mb-8 max-w-[600px]">
              <Image
                src={fetchImage(IMAGES.EXTRA)}
                alt={hero.BelowButtonImageAlt || "Showcase"}
                width={500}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Brands Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black py-8 z-30">
        <div className="max-w-[1440px] mx-auto overflow-x-auto scrollbar-hide px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
          <div className="flex items-center justify-start lg:justify-between gap-10 min-w-max lg:min-w-0">
            {Object.values(brands).map((brand) => (
              <span
                key={brand}
                className="text-white text-lg sm:text-2xl md:text-[28px] lg:text-[31px] font-bold tracking-wider whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
