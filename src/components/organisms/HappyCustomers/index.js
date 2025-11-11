"use client";

import { FaStar, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import en from "@messages/en.json";
import { useRef, useEffect } from "react";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";

export default function HappyCustomersSection() {
  const reviews = en.HappyCustomers?.Reviews || [];
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

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

  // Auto-scroll functionality
  useEffect(() => {
    const { current } = scrollRef;
    if (!current) return;

    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        const maxScroll = current.scrollWidth - current.clientWidth;
``
        if (current.scrollLeft >= maxScroll - 10) {
          current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          current.scrollBy({ left: 400, behavior: "smooth" });
        }
      }, 2000);
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };

    startAutoScroll();

    current.addEventListener("mouseenter", stopAutoScroll);
    current.addEventListener("touchstart", stopAutoScroll);

    current.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      if (current) {
        current.removeEventListener("mouseenter", stopAutoScroll);
        current.removeEventListener("touchstart", stopAutoScroll);
        current.removeEventListener("mouseleave", startAutoScroll);
      }
    };
  }, [reviews]);

  return (
    <section className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            {en.Sections.HappyCustomers}
          </h2>

          <div className="flex gap-3 items-center">
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

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
          >
            {reviews.map((customer, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 flex-shrink-0 shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{
                  width: "400px",
                  minHeight: "240px",
                  borderRadius: "20px",
                  borderWidth: "1px",
                  paddingTop: "28px",
                  paddingRight: "32px",
                  paddingBottom: "28px",
                  paddingLeft: "32px",
                }}
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(customer.Rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {customer.Image && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={customer.Image}
                        alt={customer.Name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-base text-black">
                    {customer.Name}
                  </h3>
                  <FaCheckCircle className="text-green-700 text-sm" />
                </div>

                <p className="text-gray-700 leading-relaxed text-sm">
                  {customer.Review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
