"use client";

import { useState } from "react";
import Heading from "@/components/atoms/Heading";
import ProductGrid from "@/components/molecules/ProductGrid";
import { PRODUCTS } from "@/constants/product-constants";
import en from "@messages/en.json";

// Combine top-selling + “you might also like” for the expanded view
const ALL_TOP_SELLING = [
  ...PRODUCTS.topSelling,
  ...PRODUCTS.youMightAlsoLike,
  ...PRODUCTS.newArrivals,
];

const TopSelling = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? ALL_TOP_SELLING : PRODUCTS.topSelling;

  return (
    <section className="pt-0 pb-10 sm:pt-1 sm:pb-12 md:pt-2 md:pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heading
          text={en.Sections.TopSelling}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10"
        />

        <ProductGrid products={displayedProducts} />

        <div className="mt-8 sm:mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-white text-black border border-black px-10 sm:px-14 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-300"
          >
            {showAll ? en.Buttons.ShowLess : en.Buttons.ViewAll}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
