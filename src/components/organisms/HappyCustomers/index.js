"use client";

import { FaStar, FaCheckCircle } from "react-icons/fa";
import en from "@messages/en.json";
import { useRef } from "react";

export default function HappyCustomersSection() {
  // ✅ Correct JSON key path with safe fallback
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
          {/* ✅ Correct Section title key */}
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            {en.Sections.HappyCustomers}
          </h2>

          {/* Scroll Arrows */}
          <div className="flex gap-6 text-2xl text-gray-700">
            <button
              onClick={() => scroll("left")}
              className="hover:text-black transition-transform transform hover:scale-110"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="hover:text-black transition-transform transform hover:scale-110"
              aria-label="Scroll right"
            >
              →
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

              {/* Name + Verified */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-lg text-black">
                  {customer.Name}
                </h3>
                <FaCheckCircle className="text-green-700 text-base" />
              </div>

              {/* Review */}
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
