"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import en from "@messages/en.json";

export default function CartPage() {
  const cartText = en.CartPage;
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
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
    <div className="mt-28 px-6 md:px-12 pb-20">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          {cartText.BreadcrumbHome}
        </Link>{" "}
        &gt; <span className="text-gray-800">{cartText.BreadcrumbCart}</span>
      </div>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        {cartText.Title}
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">{cartText.EmptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-6">
              {cart.map((item, index) => (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row justify-between items-start py-6 relative">
                    {/* Product Info */}
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-cover rounded-lg border border-gray-100"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h2>

                        {/* Size & Color */}
                        <div className="text-sm text-gray-600 mt-1">
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

                        <p className="text-lg font-semibold text-gray-900 mt-3">
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    {/* Delete + Quantity */}
                    <div className="flex flex-col items-end justify-between h-full w-full sm:w-auto mt-4 sm:mt-0">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove item"
                      >
                        <FiTrash2 className="w-6 h-6" />
                      </button>

                      <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-full px-3 py-1 mt-15 w-24">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="text-gray-700 text-base font-bold hover:text-black"
                        >
                          −
                        </button>
                        <span className="font-medium text-gray-900 text-sm">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-white h-fit w-full lg:w-[200px] xl:w-[400px] mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {cartText.OrderSummaryTitle}
            </h2>

            <div className="space-y-5 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>{cartText.SubtotalLabel}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">
                  {cartText.DiscountLabel} (-20%)
                </span>
                <span className="text-red-600">-${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>{cartText.DeliveryLabel}</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              <hr className="border-gray-200 my-3" />

              <div className="flex justify-between font-semibold text-gray-900 text-base">
                <span>{cartText.TotalLabel}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex items-center gap-3 mt-5">
              <input
                type="text"
                placeholder={cartText.PromoPlaceholder}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                {cartText.ApplyButton}
              </button>
            </div>

            {/* ✅ Go to Checkout Button with Arrow */}
            <Link href="/payment">
              <button className="mt-6 w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2">
                {cartText.CheckoutButton}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
