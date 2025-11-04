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

  // ✅ Load product by slug
  useEffect(() => {
    const productName = slug?.replace(/-/g, " ");
    const allProducts = Object.values(PRODUCTS).flat();

    const foundProduct = allProducts.find(
      (p) => p.name.toLowerCase() === productName?.toLowerCase()
    );

    if (foundProduct) {
      const productImages = foundProduct.images?.length
        ? foundProduct.images
        : Array(4).fill(foundProduct.image);

      setProduct({
        name: foundProduct.name,
        rating: foundProduct.rating || 4.5,
        reviews: "8.5/10",
        price: foundProduct.price,
        originalPrice: foundProduct.oldPrice || null,
        discount:
          foundProduct.discount?.replace("-", "").replace("%", "") || null,
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
    } else {
      setProduct(null);
    }
  }, [slug]);

  const reviews = productData.reviews || [];

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  // ✅ FIXED: Add correct image (mainImage) to cart
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      name: product.name,
      color: product.colors[selectedColor]?.name,
      size: selectedSize,
      quantity,
      price: product.price,
      image: product.images[mainImage], // ✅ use selected image instead of [0]
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(cartItem);
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
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8" />

      {/* ✅ Breadcrumb */}
      <div className="container mx-auto px-6 md:px-20 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="text-gray-400">{">"}</span>
          <Link href="/#new-arrivals" className="hover:text-black">
            Shop
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-black font-medium">{product.name}</span>
        </div>
      </div>

      {/* ✅ Product Section */}
      <div className="container mx-auto px-6 md:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* ✅ Left - Images */}
          <div className="flex gap-4 h-[450px]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-24 md:w-32 h-full justify-between">
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
                    alt={`Thumbnail ${idx + 1}`}
                    width={112}
                    height={110}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* ✅ Main Image */}
            <div className="flex-1 rounded-2xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center h-full">
              <div className="relative w-full h-full">
                <Image
                  src={product.images[mainImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 550px"
                />
              </div>
            </div>
          </div>

          {/* ✅ Right - Product Details */}
          <div className="flex flex-col justify-between h-[450px]">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 uppercase">
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

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-5 leading-relaxed">
                {product.description}
              </p>

              {/* ✅ Colors */}
              <div className="mb-5">
                <p className="text-gray-600 mb-2 font-medium">Select Colors</p>
                <div className="flex items-center gap-3">
                  {product.colors?.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-9 h-9 rounded-full cursor-pointer border-2 transition relative flex items-center justify-center ${
                        selectedColor === idx
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    >
                      {selectedColor === idx && (
                        <FiCheck className="absolute text-white w-4 h-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ Sizes */}
              <div>
                <p className="text-gray-600 mb-2 font-medium">Choose Size</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-full font-medium transition ${
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
            </div>

            {/* ✅ Quantity + Cart Buttons */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-4 bg-gray-100 rounded-full px-5 py-3">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="text-gray-700 hover:text-black transition"
                  disabled={quantity === 1}
                >
                  <FiMinus className="w-5 h-5" />
                </button>
                <span className="font-medium text-lg w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="text-gray-700 hover:text-black transition"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>

              {isAdded ? (
                <Link
                  href="/cart"
                  className="flex-1 bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center"
                >
                  Go to Cart
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Tabs Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center border-b border-gray-200 gap-12">
            {["details", "reviews", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-medium transition relative ${
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

          {/* ✅ Tab Content */}
          <div className="py-8">
            {activeTab === "details" && (
              <p className="text-gray-600 max-w-3xl mx-auto text-center">
                Premium quality materials and modern design make this product a
                must-have for your wardrobe. It’s durable, stylish, and crafted
                with care.
              </p>
            )}

            {activeTab === "reviews" && (
              <ReviewSection reviews={reviews} renderStars={renderStars} />
            )}

            {activeTab === "faqs" && (
              <p className="text-gray-600 text-center">
                FAQs section coming soon...
              </p>
            )}
          </div>
        </div>

        {/* ✅ “You Might Also Like” Section */}
        <YouMightAlsoLikeSection />
      </div>
    </div>
  );
}
