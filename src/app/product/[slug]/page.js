"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { PRODUCTS } from "@/constants/product-constants";
import en from "@messages/en.json";
import ReviewSection from "@/components/organisms/ReviewSection";
import YouMightAlsoLikeSection from "@/components/organisms/MightSection";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug;

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState(null);

  const productData = en.ProductPage || {};

  useEffect(() => {
    const productName = slug;
    const allProducts = Object.values(PRODUCTS).flat();

    const foundProduct = allProducts.find(
      (p) => p.name.toLowerCase() === productName?.toLowerCase()
    );

    const productToDisplay = foundProduct || {
      name: productName || "Product",
      rating: 4.5,
      price: 260,
      oldPrice: 300,
      discount: "-40%",
      image: "/images/default-product.jpg",
      images: [],
    };

    const productImages = productToDisplay.images?.length
      ? productToDisplay.images
      : Array(4).fill(productToDisplay.image);

    setProduct({
      name: productToDisplay.name,
      rating: productToDisplay.rating || 4.5,
      reviews: "8.5/10",
      price: productToDisplay.price,
      originalPrice: productToDisplay.oldPrice || null,
      discount:
        productToDisplay.discount?.replace("-", "").replace("%", "") || null,
      description:
        "This product is perfect for any occasion. Crafted from premium materials, it offers superior comfort and style.",
      colors: [
        { name: "Olive", code: "#6B7B4F" },
        { name: "Dark Green", code: "#3A4D39" },
        { name: "Navy", code: "#2C3E50" },
      ],
      sizes: ["Small", "Medium", "Large", "X-Large"],
      images: productImages,
    });
  }, [slug]);

  const reviews = productData.reviews || [];

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      name: product.name,
      color: product.colors[selectedColor]?.name,
      size: selectedSize,
      price: product.price,
      image: product.images[mainImage],
      quantity,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.name === cartItem.name &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setIsAdded(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++)
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 text-lg" />
      );

    if (hasHalfStar)
      stars.push(
        <FaStar key="half" className="text-yellow-400 text-lg opacity-50" />
      );

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++)
      stars.push(
        <FaStar key={`empty-${i}`} className="text-gray-300 text-lg" />
      );

    return stars;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8" />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 md:py-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            {productData.breadcrumbHome || "Home"}
          </Link>
          <span className="text-gray-400">{">"}</span>
          <Link href="/#new-arrivals" className="hover:text-black">
            {productData.breadcrumbShop || "Shop"}
          </Link>
          <span className="text-gray-400">{">"}</span>
          <Link href="/#new-arrivals" className="hover:text-black">
            {productData.breadcrumbCategory || "T-shirts"}
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-black font-medium truncate">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:items-start">
          {/* Image Section */}
          <div className="w-full">
            {/* Mobile Main Image */}
            <div className="w-full rounded-2xl overflow-hidden bg-[#f8f8f8] mb-4 aspect-square lg:hidden">
              <div className="relative w-full h-full">
                <Image
                  src={product.images[mainImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="grid grid-cols-3 gap-3 lg:hidden">
              {product.images.slice(1, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(idx + 1)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition hover:border-gray-400 ${
                    mainImage === idx + 1 ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex gap-4 h-[550px]">
              <div className="flex flex-col gap-3 w-32 h-full">
                {product.images.slice(1, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(idx + 1)}
                    className={`flex-1 rounded-lg overflow-hidden cursor-pointer border-2 transition hover:border-gray-400 ${
                      mainImage === idx + 1 ? "border-black" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="thumbnail"
                      width={112}
                      height={110}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-1 rounded-2xl overflow-hidden bg-[#f8f8f8]">
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[mainImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-between h-auto lg:h-[550px]">
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating}/5
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl sm:text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
                {product.description}
              </p>

              <div className="border-t border-gray-200 mb-5"></div>

              {/* Color Selection */}
              <div className="mb-5">
                <p className="text-gray-600 mb-3 font-medium text-sm sm:text-base">
                  {productData.selectColors || "Select Colors"}
                </p>
                <div className="flex gap-3">
                  {product.colors?.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer border-2 transition flex items-center justify-center ${
                        selectedColor === idx
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.code }}
                    >
                      {selectedColor === idx && (
                        <FiCheck className="text-white w-4 h-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 mb-5"></div>

              {/* Size Selection */}
              <div className="mb-6">
                <p className="text-gray-600 mb-3 font-medium text-sm sm:text-base">
                  {productData.chooseSize || "Choose Size"}
                </p>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 mb-5"></div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
              <div className="flex items-center justify-center gap-5 bg-gray-100 rounded-full px-6 py-3 sm:px-8 sm:py-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity === 1}
                  className="text-gray-700 hover:text-black disabled:opacity-50 transition"
                >
                  <FiMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="font-medium text-base sm:text-lg min-w-[30px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="text-gray-700 hover:text-black transition"
                >
                  <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {isAdded ? (
                <Link
                  href="/cart"
                  className="flex-1 bg-black text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full font-medium hover:bg-gray-800 transition text-center text-sm sm:text-base"
                >
                  {productData.goToCart || "Go to Cart"}
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full font-medium hover:bg-gray-800 transition text-sm sm:text-base"
                >
                  {productData.addToCart || "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 md:mt-16">
          <div className="flex justify-center border-b border-gray-200 gap-4 sm:gap-8 md:gap-12 overflow-x-auto">
            {["details", "reviews", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-medium transition relative text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab === "details"
                  ? productData.productDetails || "Product Details"
                  : tab === "reviews"
                    ? productData.ratingReviews || "Rating & Reviews"
                    : productData.faqs || "FAQs"}

                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-6 sm:py-8">
            {activeTab === "details" && (
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto text-center px-4">
                {productData.productDetailsContent ||
                  "Premium quality materials and modern design make this product a must-have for your wardrobe."}
              </p>
            )}

            {activeTab === "reviews" && (
              <ReviewSection reviews={reviews} renderStars={renderStars} />
            )}

            {activeTab === "faqs" && (
              <p className="text-sm sm:text-base text-gray-600 text-center px-4">
                {productData.faqsContent || "FAQs coming soon..."}
              </p>
            )}
          </div>
        </div>

        <YouMightAlsoLikeSection />
      </div>
    </div>
  );
}
