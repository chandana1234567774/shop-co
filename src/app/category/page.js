"use client";

import en from "@messages/en.json";
import { CATEGORY_PRODUCTS } from "@/constants/product-constants";
import ProductCard from "@/components/molecules/ProductCard"; // reusable card
import { useState } from "react";

export default function CategoryPage() {
  const t = en.CategoryPage;
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <section className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-10">{t.Title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">{t.Filters.Heading}</h2>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium mb-2">{t.Filters.Color}</p>
                <div className="flex flex-wrap gap-2">
                  {["Red", "Blue", "Black", "White"].map((color) => (
                    <button
                      key={color}
                      className="px-3 py-1 border border-gray-300 rounded-full hover:bg-black hover:text-white text-sm"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">{t.Filters.Size}</p>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border border-gray-300 rounded-full hover:bg-black hover:text-white text-sm"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">{t.Filters.Price}</p>
                <input
                  type="range"
                  min="50"
                  max="300"
                  className="w-full accent-black"
                />
              </div>

              <div className="pt-4">
                <button className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90 transition">
                  {t.Filters.Apply}
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{t.SortBy}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {CATEGORY_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
