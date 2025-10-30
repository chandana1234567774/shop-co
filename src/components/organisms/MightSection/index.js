"use client";

import en from "@messages/en.json";
import ProductCard from "@/components/molecules/ProductCard";
import { PRODUCTS } from "@/constants/product-constants";

export default function YouMightAlsoLikeSection() {
  const t = en.ProductPage || {};
  const products = PRODUCTS.youMightAlsoLike || [];

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-integral mb-12">
          {t.YouMightAlsoLike || "YOU MIGHT ALSO LIKE"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
