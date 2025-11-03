"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import en from "@messages/en.json";
import fetchImage from "@/utils/image-utils"; // ✅ using your existing utility

export default function CartPage() {
  const t = en.CartPage;
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    } catch (error) {
      console.error("Error reading cart:", error);
    }
  }, []);

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    const newQty = Math.max(1, (updatedCart[index].quantity || 1) + change);
    updatedCart[index].quantity = newQty;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="px-6 md:px-12 lg:px-16 xl:px-24 pb-20 bg-gray-50 min-h-screen">
      {/* Space between Navbar and Breadcrumb */}
      <div className="pt-10" />

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-6 space-x-2">
        <Link href="/" className="text-gray-500 hover:text-black transition">
          {t.breadcrumbHome}
        </Link>
        <span className="text-gray-400">{">"}</span>
        <span className="text-gray-900 font-medium">{t.breadcrumbCart}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">{t.title}</h1>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <p className="text-gray-600">{t.emptyCart}</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 max-w-7xl">
          {/* Cart Items */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              {cart.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-col sm:flex-row justify-between items-start py-4 px-2">
                    {/* Product Info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <Image
                        src={
                          item.image && item.image.startsWith("http")
                            ? item.image
                            : fetchImage(item.image) // ✅ use your utility for local assets
                        }
                        alt={item.name || "Product image"}
                        width={90}
                        height={90}
                        className="object-cover rounded-lg border border-gray-100"
                        unoptimized
                      />

                      <div>
                        <h2 className="text-base font-semibold text-gray-900">
                          {item.name}
                        </h2>
                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                          <p>
                            Size:
                            <span className="ml-2 font-medium text-gray-800">
                              {item.size || "Medium"}
                            </span>
                          </p>
                          <p>
                            Color:
                            <span className="ml-2 font-medium text-gray-800">
                              {item.color || "Default"}
                            </span>
                          </p>
                        </div>
                        <p className="text-base font-semibold text-gray-900 mt-2">
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    {/* Delete + Quantity */}
                    <div className="flex flex-col items-end justify-between h-full w-full sm:w-auto mt-4 sm:mt-0">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-full px-3 py-1 w-20 mt-15">
                        <button
                          onClick={() => handleQuantityChange(index, -1)}
                          className="text-gray-700 text-base font-bold hover:text-black"
                        >
                          −
                        </button>
                        <span className="font-medium text-gray-900 text-sm">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(index, 1)}
                          className="text-gray-700 text-base font-bold hover:text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {index < cart.length - 1 && (
                    <hr className="border-gray-200 my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[40%] flex justify-start">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full lg:w-[110%] xl:w-[115%] h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t.orderSummary}
              </h2>

              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t.discount}</span>
                  <span className="text-red-600 font-medium">
                    -${discount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>{t.deliveryFee}</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>

                <hr className="border-gray-200 my-2" />

                <div className="flex justify-between font-semibold text-gray-900">
                  <span>{t.total}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* ✅ Promo Code with Icon */}
              <div className="flex items-center gap-2 mt-5">
                <div className="relative flex-1">
                  <Image
                    src={fetchImage("sec-page/Frame (4).png")} // ✅ uses your utils
                    alt="Promo Code Icon"
                    width={18}
                    height={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
                    unoptimized
                  />
                  <input
                    type="text"
                    placeholder={t.promoPlaceholder}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                  {t.apply}
                </button>
              </div>

              {/* Checkout Button */}
              <Link href="/payment">
                <button className="mt-5 w-full bg-black text-white py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2 group">
                  {t.checkout}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
