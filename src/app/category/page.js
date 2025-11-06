"use client";

import { useState, useEffect } from "react";
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

  // ✅ Final applied filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);

  // ✅ Temporary selections for mobile preview
  const [tempCategory, setTempCategory] = useState("");
  const [tempSize, setTempSize] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [tempPrice, setTempPrice] = useState([0, 300]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("mostPopular");

  // Dropdown toggles
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isDressStyleOpen, setIsDressStyleOpen] = useState(true);

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

  // ✅ Prevent body scroll when filter modal is open
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFilters]);

  // ✅ Filter Products on Apply
  const filteredProducts = PRODUCTS.categories
    .filter((product) => {
      if (selectedCategory && product.category !== selectedCategory)
        return false;
      if (selectedSize && product.size !== selectedSize) return false;
      if (selectedColor && product.color !== selectedColor) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "lowestPrice") return a.price - b.price;
      if (sortBy === "highestPrice") return b.price - a.price;
      return 0;
    });

  // ✅ Apply Filters Button Logic
  const applyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedSize(tempSize);
    setSelectedColor(tempColor);
    setPriceRange(tempPrice);
    setShowFilters(false);
  };

  // ✅ When opening filter drawer, sync temporary preview
  const openFilterDrawer = () => {
    setTempCategory(selectedCategory);
    setTempSize(selectedSize);
    setTempColor(selectedColor);
    setTempPrice(priceRange);
    setShowFilters(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 md:py-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <span className="hover:text-black cursor-pointer">
            {t.breadcrumbHome}
          </span>
          <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-black font-medium">{t.breadcrumbCategory}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar - Mobile Overlay + Desktop Sidebar */}
          <aside
            className={`${
              showFilters
                ? "block fixed inset-0 z-50 bg-white overflow-y-auto"
                : "hidden"
            } lg:block lg:static lg:w-[295px] border-0 lg:border border-gray-200 rounded-none lg:rounded-[20px] p-5 lg:p-6 h-full lg:h-fit lg:sticky lg:top-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold">{t.filters}</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <hr className="mb-5 border-gray-200" />

            {/* Category */}
            <div className="mb-5">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {t.category}
                </h3>
                {isCategoryOpen ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </div>
              {isCategoryOpen && (
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <label
                        className="flex items-center justify-between cursor-pointer text-sm text-gray-500 hover:text-black transition"
                        onClick={() =>
                          setTempCategory(cat === tempCategory ? "" : cat)
                        }
                      >
                        <span
                          className={
                            tempCategory === cat
                              ? "font-semibold text-black"
                              : ""
                          }
                        >
                          {cat}
                        </span>
                        <FiChevronRight
                          className={`w-4 h-4 ${
                            tempCategory === cat
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

            {/* Price */}
            <div className="mb-5">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {t.price}
                </h3>
                {isPriceOpen ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </div>
              {isPriceOpen && (
                <>
                  <div className="relative pt-1 pb-4">
                    <div className="relative h-1 bg-gray-200 rounded-lg">
                      <div
                        className="absolute h-1 bg-black rounded-lg"
                        style={{
                          left: `${(tempPrice[0] / 300) * 100}%`,
                          width: `${((tempPrice[1] - tempPrice[0]) / 300) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {["min", "max"].map((_, i) => (
                      <input
                        key={i}
                        type="range"
                        min="0"
                        max="300"
                        step="10"
                        value={tempPrice[i]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setTempPrice((prev) => {
                            const next = [...prev];
                            next[i] = val;
                            return next[0] > next[1] ? prev : next;
                          });
                        }}
                        className="absolute top-0 w-full appearance-none bg-transparent pointer-events-none
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-black
    [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-sm font-bold text-black mt-2">
                    <span>${tempPrice[0]}</span>
                    <span>${tempPrice[1]}</span>
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
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {t.colors}
                </h3>
                {isColorOpen ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </div>
              {isColorOpen && (
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() =>
                        setTempColor(c.name === tempColor ? "" : c.name)
                      }
                      className={`w-8 h-8 sm:w-[37px] sm:h-[37px] rounded-full border-2 transition relative ${
                        tempColor === c.name
                          ? "border-black ring-2 ring-black ring-offset-2"
                          : c.hex === "#FFFFFF"
                            ? "border-gray-300"
                            : "border-gray-200"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                    />
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
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {t.size}
                </h3>
                {isSizeOpen ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </div>
              {isSizeOpen && (
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setTempSize(size === tempSize ? "" : size)}
                      className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm transition ${
                        tempSize === size
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

            {/* Apply Filter Button */}
            <button
              className="w-full bg-black text-white py-3 sm:py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              onClick={applyFilters}
            >
              {t.applyFilter}
            </button>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Header with Title, Results Count, Sort, and Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl md:text-[32px] font-bold">
                {t.breadcrumbCategory}
              </h1>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs sm:text-sm text-gray-600">
                  Showing{" "}
                  <span className="hidden sm:inline">
                    {filteredProducts.length}
                  </span>
                  <span className="sm:hidden">{filteredProducts.length}</span>{" "}
                  Product{filteredProducts.length !== 1 ? "s" : ""}
                </span>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="hidden sm:block text-sm">Sort by:</span>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
                  >
                    <option value="mostPopular">{t.mostPopular}</option>
                    <option value="lowestPrice">{t.lowestPrice}</option>
                    <option value="highestPrice">{t.highestPrice}</option>
                  </select>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={openFilterDrawer}
                    className="lg:hidden p-2 rounded-full bg-[#F0F0F0] hover:bg-gray-200 transition"
                    aria-label="Open filters"
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
            </div>

            {/* Product Listing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 border-t border-gray-200 pt-6 sm:pt-8 pb-6">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex items-center gap-2 w-full sm:w-auto justify-center">
                <span>←</span>
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-2 sm:pb-0">
                {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
                  <button
                    key={idx}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition flex-shrink-0 ${
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

              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex items-center gap-2 w-full sm:w-auto justify-center">
                <span>Next</span>
                <span>→</span>
              </button>
            </div> */}
          </main>
        </div>
      </div>
    </div>
  );
}
