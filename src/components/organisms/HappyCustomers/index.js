"use client";

import { FaStar, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import en from "@messages/en.json";
import { useRef } from "react";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";

export default function HappyCustomersSection() {
  const reviews = en.HappyCustomers?.Reviews || [];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative">
        {/* Heading and Arrows beside it */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            {en.Sections.HappyCustomers}
          </h2>

          {/* Scroll Arrows (with Images - No Background) */}
          <div className="flex gap-3 items-center">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:opacity-70 transition-all"
              aria-label="Scroll left"
            >
              <Image
                src={fetchImage(IMAGES.ARROW_LEFT)}
                alt="Scroll Left"
                width={40}
                height={40}
                className="object-contain"
              />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:opacity-70 transition-all"
              aria-label="Scroll right"
            >
              <Image
                src={fetchImage(IMAGES.ARROW_RIGHT)}
                alt="Scroll Right"
                width={40}
                height={40}
                className="object-contain"
              />
            </button>
          </div>
        </div>

        {/* Scrollable Review Cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth px-2 sm:px-4 no-scrollbar"
        >
          {reviews.map((customer, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-2xl p-8 w-[320px] sm:w-[360px] flex-shrink-0 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(customer.Rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Name + Image + Verified */}
              <div className="flex items-center gap-2 mb-3">
                {customer.Image && (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={customer.Image}
                      alt={customer.Name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-lg text-black">
                  {customer.Name}
                </h3>
                <FaCheckCircle className="text-green-700 text-base" />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {customer.Review}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
