"use client";

import Heading from "@/components/atoms/Heading";
import ProductGrid from "@/components/molecules/ProductGrid";
import { PRODUCTS } from "@/constants/product-constants";
import en from "@messages/en.json";

const NewArrivals = () => (
  <section id="new-arrivals" className="py-10 sm:py-14 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <Heading
        text={en.Sections.NewArrivals}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10"
      />

      {/* Product Grid */}
      <ProductGrid products={PRODUCTS.newArrivals} />

      {/* View All Button */}
      <div className="mt-8 sm:mt-10">
        <button className="bg-white text-black border border-gray-300 px-14 py-2 rounded-full text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-300">
          {en.Buttons.ViewAll}
        </button>
      </div>

      {/* Divider Line */}
      <div className="mt-16 border-t border-gray-300 w-[80%] sm:w-[92%] md:w-[95%] mx-auto"></div>
    </div>
  </section>
);

export default NewArrivals;
