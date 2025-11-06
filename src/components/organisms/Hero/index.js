"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";

// Star Image Component
const StarIcon = ({ className = "", size = 64 }) => (
  <Image
    src={fetchImage(IMAGES.STAR)}
    alt="Star decoration"
    width={size}
    height={size}
    className={className}
  />
);

export default function Hero() {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    import("../../../../messages/en.json")
      .then((data) => setMessages(data.default))
      .catch((err) => console.error("Error loading messages:", err));
  }, []);

  const hero = messages.Hero || {};
  const brands = messages.BrandsBar || {};

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#F2F0F1]">
      <div className="hidden lg:block absolute right-0 top-[-70px] bottom-[-100px] w-full">
        <Image
          src={fetchImage(IMAGES.HERO)}
          alt={hero.BackgroundAlt || "Background"}
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      <StarIcon
        size={80}
        className="absolute top-[12%] right-[5%] hidden md:block "
      />

      <StarIcon
        size={54}
        className="absolute top-[40%] left-[50%]  hidden md:block"
      />

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-20 pb-12">
          <div className="max-w-full md:max-w-[580px]">
            {/* Headline */}
            <h1 className="text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-black text-black leading-[1.1] mb-4">
              <span className="block">{hero.HeadlineLine1}</span>
              <span className="block">{hero.HeadlineLine2}</span>
              <span className="block">{hero.HeadlineLine3}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-[545px]">
              {hero.SubheadlineLine1} {hero.SubheadlineLine2}
            </p>

            {/* ✅ "Shop Now" Button that navigates to /category */}
            <Link href="/category">
              <Button className="px-12 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 mb-10">
                {hero.Button}
              </Button>
            </Link>

            {/* Stats/Metrics Image */}
            <div className="max-w-[600px]">
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
    </section>
  );
}
