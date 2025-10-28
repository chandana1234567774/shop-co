"use client";

import Image from "next/image";
import { PRODUCTS } from "@/constants/product-constants";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

export default function ProductPage({ params }) {
  const { slug } = params;

  // Combine all products
  const allProducts = [...PRODUCTS.newArrivals, ...PRODUCTS.topSelling];

  // Match slug to product name
  const product = allProducts.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  // If no product found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Keep Navbar same as homepage */}
      <Navbar />

      {/* ✅ Product Detail Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-2xl object-contain w-full h-auto"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-5">
              {product.description ||
                "This is a stylish and high-quality product, perfect for your wardrobe."}
            </p>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-black">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
              {product.discount && (
                <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}
                </span>
              )}
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Keep Footer same as homepage */}
      <Footer />
    </>
  );
}
