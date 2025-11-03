"use client";

import { useState } from "react";
import en from "@messages/en.json";
import { PRODUCTS } from "@/constants/product-constants";
import ProductCard from "@/components/molecules/ProductCard";

export default function CategoryPage() {
  const t = en.CategoryPage;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);

  // ✅ Access the array correctly
  const filteredProducts = PRODUCTS.categories.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSize = !selectedSize || product.size === selectedSize;
    const matchesColor = !selectedColor || product.color === selectedColor;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesSize && matchesColor && matchesPrice;
  });

  const categories = ["T-shirts", "Shirts", "Jeans", "Shorts"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "black", hex: "#000000" },
    { name: "red", hex: "#FF0000" },
    { name: "green", hex: "#00FF00" },
    { name: "blue", hex: "#0000FF" },
    { name: "white", hex: "#FFFFFF" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>{t.breadcrumbHome}</span> /{" "}
        <span className="text-gray-800 font-medium">
          {t.breadcrumbCategory}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 bg-gray-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-6">{t.filters}</h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t.category}</h3>
            <ul className="space-y-2 text-gray-600">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(cat === selectedCategory ? "" : cat)
                  }
                  className={`cursor-pointer ${
                    selectedCategory === cat
                      ? "font-semibold text-black"
                      : "hover:text-gray-800"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t.price}</h3>
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-sm mt-1 text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t.colors}</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() =>
                    setSelectedColor(c.name === selectedColor ? "" : c.name)
                  }
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === c.name
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t.size}</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size === selectedSize ? "" : size)
                  }
                  className={`px-3 py-1 border rounded-full text-sm ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => {
              setSelectedCategory("");
              setSelectedColor("");
              setSelectedSize("");
              setPriceRange([0, 300]);
            }}
          >
            {t.applyFilter}
          </button>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{t.breadcrumbCategory}</h2>
            <select className="border border-gray-300 rounded-md text-sm px-3 py-2">
              <option>{t.mostPopular}</option>
              <option>{t.lowestPrice}</option>
              <option>{t.highestPrice}</option>
            </select>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products match your filters.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
