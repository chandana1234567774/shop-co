"use client";

import { useState } from "react";
import Heading from "@/components/atoms/Heading";
import ProductGrid from "@/components/molecules/ProductGrid";
import { PRODUCTS } from "@/constants/product-constants";
import en from "@messages/en.json";

const ALL_NEW_ARRIVALS = [
  ...PRODUCTS.newArrivals,
  ...PRODUCTS.topSelling,
  ...PRODUCTS.youMightAlsoLike,
];
const NewArrivals = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? ALL_NEW_ARRIVALS : PRODUCTS.newArrivals;

  return (
    <section id="new-arrivals" className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Heading
          text={en.Sections.NewArrivals}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10"
        />

        <ProductGrid products={displayedProducts} />

        <div className="mt-8 sm:mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-white text-black border border-gray-300 px-14 py-2 rounded-full text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-300"
          >
            {showAll ? en.Buttons.ShowLess : en.Buttons.ViewAll}
          </button>
        </div>

        <div className="mt-16 border-t border-gray-300 w-[80%] sm:w-[92%] md:w-[95%] mx-auto" />
      </div>
    </section>
  );
};

export default NewArrivals;
