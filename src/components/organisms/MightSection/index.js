"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import en from "@messages/en.json";
import ProductCard from "@/components/molecules/ProductCard";
import { PRODUCTS } from "@/constants/product-constants";

export default function YouMightAlsoLikeSection() {
  const t = en.ProductPage || {};
  const params = useParams();
  const currentSlug = params?.slug;

  // ✅ Get current product name from slug
  const currentProductName = currentSlug?.toLowerCase();

  // ✅ Generate related products dynamically
  const relatedProducts = useMemo(() => {
    // Get all products from all categories
    const allProducts = PRODUCTS?.youMightAlsoLike?.filter(
      (product) => product && product.name
    );

    // Filter out the current product
    const otherProducts = allProducts.filter(
      (product) => product.name.toLowerCase() !== currentProductName
    );

    // Shuffle the array
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());

    // Return 4 random products
    return shuffled.slice(0, 4);
  }, [currentProductName]);

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-integral mb-12">
          {t.YouMightAlsoLike || "YOU MIGHT ALSO LIKE"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <ProductCard
              key={`${product.id || index}-${product.name}`} // ✅ Unique key fix
              id={product.id}
              name={product.name}
              image={
                product.image ||
                product.images?.[0] ||
                "/images/default-product.jpg"
              } // ✅ Image fallback
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating || 4.5}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
