"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import en from "@messages/en.json";
import { PRODUCTS } from "@/constants/product-constants";
import ProductCard from "@/components/molecules/ProductCard";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";

export default function CategoryPage() {
  const t = en.CategoryPage;
  const { FILTER_ICON } = IMAGES;

  // 🧠 States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("mostPopular");

  // Dropdown toggles
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isDressStyleOpen, setIsDressStyleOpen] = useState(true);

  // Data
  const filteredProducts = PRODUCTS.categories;
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const colors = [
    { name: "Green", hex: "#00C12B" },
    { name: "Red", hex: "#F50606" },
    { name: "Yellow", hex: "#F5DD06" },
    { name: "Orange", hex: "#F57906" },
    { name: "Light Blue", hex: "#06CAF5" },
    { name: "Blue", hex: "#063AF5" },
    { name: "Purple", hex: "#7D06F5" },
    { name: "Pink", hex: "#F506A4" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
  ];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  const totalProducts = 100;
  const displayedCount = 10;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 md:px-20 py-4 md:py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hover:text-black cursor-pointer">
            {t.breadcrumbHome}
          </span>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">{t.breadcrumbCategory}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters
                ? "block fixed inset-0 z-50 bg-white overflow-y-auto p-5"
                : "hidden"
            } lg:block lg:static lg:w-[295px] border border-gray-200 rounded-[20px] p-5 h-fit lg:sticky lg:top-6`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{t.filters}</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden"
              >
                <Image
                  src={fetchImage(FILTER_ICON)}
                  alt="Filter"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <hr className="mb-5 border-gray-200" />

            {/* Category Filter */}
            <div className="mb-5">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <h3 className="font-semibold text-base text-gray-900">
                  {t.category}
                </h3>
                {isCategoryOpen ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {isCategoryOpen && (
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <label
                        className="flex items-center justify-between cursor-pointer text-gray-500 hover:text-black"
                        onClick={() =>
                          setSelectedCategory(
                            cat === selectedCategory ? "" : cat
                          )
                        }
                      >
                        <span
                          className={
                            selectedCategory === cat
                              ? "font-semibold text-black"
                              : ""
                          }
                        >
                          {cat}
                        </span>
                        <FiChevronRight
                          className={`w-4 h-4 ${
                            selectedCategory === cat
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <hr className="mb-5 border-gray-200" />

            {/* Price Filter */}
            <div className="mb-5">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <h3 className="font-semibold text-base text-gray-900">
                  {t.price}
                </h3>
                {isPriceOpen ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {isPriceOpen && (
                <>
                  <div className="relative pt-1 pb-4">
                    <div className="relative h-2 bg-gray-200 rounded-lg">
                      <div
                        className="absolute h-2 bg-black rounded-lg"
                        style={{
                          left: `${(priceRange[0] / 300) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / 300) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {/* Range Inputs */}
                    {["min", "max"].map((_, i) => (
                      <input
                        key={i}
                        type="range"
                        min="0"
                        max="300"
                        step="10"
                        value={priceRange[i]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPriceRange((prev) => {
                            const next = [...prev];
                            next[i] = val;
                            if (next[0] > next[1]) return prev;
                            return next;
                          });
                        }}
                        className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-sm font-bold text-black mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </>
              )}
            </div>

            <hr className="mb-5 border-gray-200" />

            {/* Colors */}
            <div className="mb-5">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                <h3 className="font-semibold text-base text-gray-900">
                  {t.colors}
                </h3>
                {isColorOpen ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {isColorOpen && (
                <div className="flex flex-wrap gap-4">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() =>
                        setSelectedColor(c.name === selectedColor ? "" : c.name)
                      }
                      className={`w-[37px] h-[37px] rounded-full border-2 transition relative ${
                        selectedColor === c.name
                          ? "border-black"
                          : c.hex === "#FFFFFF"
                            ? "border-gray-300"
                            : "border-gray-200"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <div className="absolute inset-0 rounded-full border-2 border-white m-1"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <hr className="mb-5 border-gray-200" />

            {/* Sizes */}
            <div className="mb-5">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
              >
                <h3 className="font-semibold text-base text-gray-900">
                  {t.size}
                </h3>
                {isSizeOpen ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {isSizeOpen && (
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size === selectedSize ? "" : size)
                      }
                      className={`px-5 py-2.5 rounded-full text-sm transition ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <hr className="mb-5 border-gray-200" />

            {/* Dress Style */}
            <div className="mb-6">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsDressStyleOpen(!isDressStyleOpen)}
              >
                <h3 className="font-semibold text-base text-gray-900">
                  Dress Style
                </h3>
                {isDressStyleOpen ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {isDressStyleOpen && (
                <ul className="space-y-3">
                  {dressStyles.map((style) => (
                    <li key={style}>
                      <label className="flex items-center justify-between cursor-pointer text-gray-500 hover:text-black">
                        <span>{style}</span>
                        <FiChevronRight className="w-4 h-4 text-gray-400" />
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Apply Button */}
            <button
              className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              onClick={() => setShowFilters(false)}
            >
              {t.applyFilter}
            </button>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
              <h1 className="text-2xl sm:text-[32px] font-bold">
                {t.breadcrumbCategory}
              </h1>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-gray-600 hidden md:block whitespace-nowrap">
                  Showing 1-{displayedCount} of {totalProducts} Products
                </span>
                <span className="text-sm text-gray-600 hidden sm:block whitespace-nowrap">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm px-3 py-2 font-semibold focus:outline-none bg-white border-0"
                >
                  <option value="mostPopular">{t.mostPopular}</option>
                  <option value="lowestPrice">{t.lowestPrice}</option>
                  <option value="highestPrice">{t.highestPrice}</option>
                </select>

                {/* Filter Icon (Mobile) */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden p-2 rounded-full bg-[#F0F0F0] hover:bg-gray-200 transition flex items-center justify-center"
                >
                  <Image
                    src={fetchImage(FILTER_ICON)}
                    alt="Filter"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination (Centered) */}
            <div className="flex items-center justify-center gap-34 border-t border-gray-200 pt-8 pb-6">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center gap-2">
                <span>←</span>
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
                  <button
                    key={idx}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      page === 1
                        ? "bg-black text-white"
                        : page === "..."
                          ? "cursor-default text-gray-400"
                          : "hover:bg-gray-100 text-gray-600"
                    }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center gap-2">
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
