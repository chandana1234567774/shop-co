"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Heart, Share2, ShoppingCart, CheckCircle } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [buttonText, setButtonText] = useState(en.ProductCard.AddButton);
  const [isAdding, setIsAdding] = useState(false);
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const text = en.ProductCard;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const existingCart = localStorage.getItem("cart");
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const existingProductIndex = cart.findIndex((item) => item.id === id);

      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push({
          id,
          name,
          image,
          price,
          oldPrice,
          discount,
          quantity: 1,
          slug,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));

      // ✅ Show "Added to cart" in button temporarily
      setButtonText(text.AddedMessage);
      setTimeout(() => setButtonText(text.AddButton), 1500);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-start text-left w-full max-w-[280px] mx-auto cursor-pointer">
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

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 rounded-2xl ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              className={`${
                buttonText === text.AddedMessage
                  ? "bg-gray-600 text-white"
                  : "bg-white text-black hover:bg-gray hover:text-black"
              } px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {buttonText === text.AddedMessage ? (
                <CheckCircle size={16} />
              ) : (
                <ShoppingCart size={16} />
              )}
              {isAdding ? text.AddingText : buttonText}
            </button>
          </div>

          {/* Like & Share Buttons */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <button
              className="bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"
              title={text.WishlistTooltip}
            >
              <Heart size={18} />
            </button>
            <button
              className="bg-white p-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
              title={text.ShareTooltip}
            >
              <Share2 size={18} />
            </button>
          </div>
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
