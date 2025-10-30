"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import en from "@messages/en.json";

const ProductCard = ({
  id,
  name,
  image,
  price,
  oldPrice,
  rating = 4.5,
  discount,
}) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <div className="flex flex-col items-start text-left w-full cursor-pointer">
        {/* Product Image */}
        <div className="w-full overflow-hidden rounded-2xl relative group">
          <Link href={`/product/${slug}`}>
            <Image
              src={image}
              alt={name}
              width={280}
              height={280}
              className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Product Info */}
        <Link href={`/product/${slug}`} className="mt-3 w-full">
          <h3 className="text-gray-900 font-medium text-base truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  } text-sm`}
                />
              ))}
            <span className="text-gray-600 text-sm ml-1">{rating}/5</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-black">${price}</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${oldPrice}
              </span>
            )}
            {discount && (
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                {discount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
