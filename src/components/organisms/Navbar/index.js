"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Input from "@/components/atoms/Input";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";
import en from "@messages/en.json";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navbar = en.Navbar || {};
  const searchPlaceholder = en.SearchPlaceholder || "";
  const { CART, USER } = IMAGES;

  // ✅ Load initial cart count and listen for updates
  useEffect(() => {
    const getCartCount = () => {
      if (typeof window === "undefined") return 0;
      const storedCart = localStorage.getItem("cart");
      if (!storedCart) return 0;
      const cart = JSON.parse(storedCart);
      return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    };

    // Initial count
    setCartCount(getCartCount());

    // Listen for cart updates
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // ✅ Smooth scroll to sections
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-white shadow-md px-5 md:px-10 py-4 flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50">
      {/* LEFT: Logo + Links */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-wide cursor-pointer">
          {navbar.Logo || "ShopEase"}
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="flex items-center gap-1 hover:text-black transition-colors">
              {navbar.Shop || "Shop"}
              <svg
                className="w-4 h-4 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </span>

            {isDropdownOpen && (
              <ul className="absolute left-0 top-8 bg-white shadow-lg rounded-xl py-3 px-4 w-44 space-y-2 border border-gray-100 z-50">
                {["Men", "Women", "Kids", "Accessories"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-black cursor-pointer transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li
            className="hover:text-black cursor-pointer transition-colors"
            onClick={() => handleScrollToSection("on-sale")}
          >
            {navbar.OnSale || "On Sale"}
          </li>

          <li
            className="hover:text-black cursor-pointer transition-colors"
            onClick={() => handleScrollToSection("new-arrivals")}
          >
            {navbar.NewArrivals || "New Arrivals"}
          </li>

          <li
            className="hover:text-black cursor-pointer transition-colors"
            onClick={() => handleScrollToSection("brands")}
          >
            {navbar.Brands || "Brands"}
          </li>
        </ul>
      </div>

      {/* RIGHT: Search + Icons */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Desktop Search */}
        <div className="hidden lg:flex w-[18rem] relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 pr-4 w-full py-2 rounded-full border border-gray-300 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* ✅ Cart Icon with badge */}
          <div className="relative">
            <Link href="/cart">
              <Image
                src={fetchImage(CART)}
                alt="Cart"
                width={24}
                height={24}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </Link>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* User Icon */}
          <Image
            src={fetchImage(USER)}
            alt="User"
            width={24}
            height={24}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex items-center text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FiX className="w-7 h-7" />
          ) : (
            <FiMenu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-100 lg:hidden z-50">
          <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
            <li>{navbar.Shop || "Shop"}</li>
            <li
              onClick={() => handleScrollToSection("on-sale")}
              className="cursor-pointer"
            >
              {navbar.OnSale || "On Sale"}
            </li>
            <li
              onClick={() => handleScrollToSection("new-arrivals")}
              className="cursor-pointer"
            >
              {navbar.NewArrivals || "New Arrivals"}
            </li>
            <li
              onClick={() => handleScrollToSection("brands")}
              className="cursor-pointer"
            >
              {navbar.Brands || "Brands"}
            </li>

            {/* Mobile Search */}
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-10/12 focus-within:border-gray-600 transition">
              <FiSearch className="mr-2 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                className="w-full text-sm pl-0"
              />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
