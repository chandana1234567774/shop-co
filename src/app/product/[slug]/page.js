"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";
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
  const { STAR_FULL, STAR_HALF } = IMAGES;

  useEffect(() => {
    // Get product data from your products list based on slug
    // This could come from your NewArrivals section or a centralized product data source
    const productName = slug?.replace(/-/g, " ");

    // Example: Fetch from your products data
    // Replace this with your actual product data source
    const allProducts = en.NewArrivalsSection?.products || [];
    const foundProduct = allProducts.find(
      (p) => p.name.toLowerCase() === productName?.toLowerCase()
    );

    if (foundProduct) {
      setProduct({
        name: foundProduct.name,
        rating: foundProduct.rating || productData.rating,
        reviews: productData.reviewCount,
        price: foundProduct.price,
        originalPrice: foundProduct.oldPrice || productData.originalPrice,
        discount:
          foundProduct.discount?.replace("-", "").replace("%", "") ||
          productData.discount,
        description: productData.description,
        colors: productData.colors || [],
        sizes: productData.sizes || [],
        // Use the product's actual image, and create thumbnails
        // If you have multiple images per product, use them here
        images: [
          foundProduct.image,
          foundProduct.image, // Duplicate for now, or add actual thumbnail images
          foundProduct.image,
          foundProduct.image,
        ],
      });
    } else {
      // Fallback to default product data
      setProduct({
        name: productData.productName,
        rating: productData.rating,
        reviews: productData.reviewCount,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discount: productData.discount,
        description: productData.description,
        colors: productData.colors || [],
        sizes: productData.sizes || [],
        images: [
          IMAGES.PRODUCT_MAIN,
          IMAGES.PRODUCT_THUMB_1,
          IMAGES.PRODUCT_THUMB_2,
          IMAGES.PRODUCT_THUMB_3,
        ],
      });
    }
  }, [slug]);

  const reviews = productData.reviews || [];

  const handleQuantityChange = (type) => {
    if (type === "increase") setQuantity((prev) => prev + 1);
    else if (type === "decrease" && quantity > 1)
      setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    const cartItem = {
      name: product.name,
      color: product.colors[selectedColor]?.name,
      size: selectedSize,
      quantity,
      price: product.price,
      image: product.images[0],
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

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={`full-${i}`}
          src={fetchImage(STAR_FULL)}
          alt="star"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Image
          key="half"
          src={fetchImage(STAR_HALF)}
          alt="half-star"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
      );
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8" />
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 md:px-20 py-6 ">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            {productData.breadcrumbHome}
          </Link>
          <span className="text-gray-400">{">"}</span>
          <Link href="/shop" className="hover:text-black">
            {productData.breadcrumbShop}
          </Link>
          <span className="text-gray-400">{">"}</span>
          <Link href="/product/men" className="hover:text-black">
            {productData.breadcrumbMen}
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-black font-medium">
            {productData.breadcrumbCategory}
          </span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-6 md:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Side - Images */}
          <div className="flex gap-4 h-[530px]">
            <div className="flex flex-col gap-4">
              {product.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(idx + 1)}
                  className={`w-24 h-36 md:w-28 md:h-40 rounded-xl overflow-hidden cursor-pointer border-2 transition hover:border-gray-400 ${
                    mainImage === idx + 1 ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={fetchImage(img)}
                    alt={`Product view ${idx + 1}`}
                    width={112}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={fetchImage(product.images[mainImage])}
                alt={product.name}
                width={600}
                height={530}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-between h-[530px]">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-integral">
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

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="border-t border-gray-200 mb-6"></div>

              {/* Colors */}
              <div className="mb-6">
                <p className="text-gray-600 mb-3 font-medium">
                  {productData.selectColors || "Select Colors"}
                </p>
                <div className="flex items-center gap-3">
                  {product.colors?.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-10 h-10 rounded-full cursor-pointer border-2 transition relative flex items-center justify-center ${
                        selectedColor === idx
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    >
                      {selectedColor === idx && (
                        <FiCheck className="absolute text-white w-5 h-5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 mb-6"></div>

              {/* Sizes */}
              <div className="mb-6">
                <p className="text-gray-600 mb-3 font-medium">
                  {productData.chooseSize}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2.5 rounded-full font-medium transition ${
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

              <div className="border-t border-gray-200 mb-6"></div>
            </div>

            {/* Quantity & Cart */}
            <div className="flex items-center gap-4">
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
                  {productData.addToCart}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs & Reviews */}
        <div className="mt-16">
          <div className="flex items-center justify-center border-b border-gray-200 gap-12 md:gap-55">
            {["details", "reviews", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition relative ${
                  activeTab === tab
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {
                  productData[
                    tab === "details"
                      ? "productDetails"
                      : tab === "reviews"
                        ? "ratingReviews"
                        : "faqs"
                  ]
                }
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                )}
              </button>
            ))}
          </div>

          {activeTab === "reviews" && (
            <ReviewSection reviews={reviews} renderStars={renderStars} />
          )}

          <YouMightAlsoLikeSection />
        </div>
      </div>
    </div>
  );
}
