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
  const [showBanner, setShowBanner] = useState(true);

  const navbar = en.Navbar || {};
  const searchPlaceholder = en.SearchPlaceholder || "";
  const { CART, USER } = IMAGES;

  useEffect(() => {
    const getCartCount = () => {
      if (typeof window === "undefined") return 0;
      const storedCart = localStorage.getItem("cart");
      if (!storedCart) return 0;
      const cart = JSON.parse(storedCart);
      return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    };

    setCartCount(getCartCount());
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

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
    <>
      {/* ✅ Offer Banner */}
      {showBanner && (
        <div className="bg-black text-white h-[32px] px-5 md:px-10 flex items-center justify-between fixed top-0 left-0 right-0 z-50 font-satoshi">
          <div className="flex-1 text-center">
            <p className="font-satoshi font-[400] text-[13px] text-white">
              Sign up and get 20% off your first order.{" "}
              <Link
                href="/signup"
                className="underline text-white hover:text-gray-100 transition-colors"
              >
                Sign Up Now
              </Link>
            </p>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="text-white hover:text-gray-300 transition-colors ml-4"
            aria-label="Close banner"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ✅ Navbar */}
      <nav
        className="bg-white shadow-md px-6 md:px-20 py-3 flex items-center justify-between w-full fixed left-0 right-0 z-40 transition-all"
        style={{
          top: showBanner ? "32px" : "0px",
        }}
      >
        {/* LEFT: Logo + Links */}
        <div className="flex items-center gap-10">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-integral font-extrabold text-gray-900 tracking-wide cursor-pointer logo-font-family">
              {navbar.Logo}
            </h1>
          </Link>

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

              {/* ✅ Fixed Dropdown - stays open when hovering */}
              {isDropdownOpen && (
                <ul
                  className="absolute left-0 top-8 bg-white shadow-lg rounded-xl py-3 px-4 w-44 space-y-2 border border-gray-100 z-50"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {["Men", "Women", "Kids", "Accessories"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/product/${item.toLowerCase()}`}
                        className="block hover:text-black hover:bg-gray-50 px-2 py-1.5 rounded cursor-pointer transition-colors"
                      >
                        {item}
                      </Link>
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
        <div className="flex items-center gap-4 md:gap-6">
          {/* ✅ Search bar (visible only on laptop/desktop) */}
          <div
            className="hidden md:flex w-[22rem] lg:w-[28rem] h-[2.5rem] relative rounded-full"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 w-full py-2.5 rounded-full border-none bg-[#F0F0F0] focus:ring-1 focus:ring-gray-600 transition text-base"
            />
          </div>

          {/* Cart + User Icons */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Link href="/cart">
                <Image
                  src={fetchImage(CART)}
                  alt="Cart"
                  width={26}
                  height={26}
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
              </Link>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            <Image
              src={fetchImage(USER)}
              alt="User"
              width={26}
              height={26}
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

        {/* ✅ Mobile Dropdown */}
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

              {/* ✅ Fixed Mobile Search Bar */}
              <div className="flex items-center rounded-full px-4 py-2 w-10/12 bg-gray-50 focus-within:bg-white transition">
                <FiSearch className="mr-2 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder}
                  className="w-full text-sm pl-0 border-none bg-transparent focus:ring-0 focus:outline-none"
                />
              </div>
            </ul>
          </div>
        )}
      </nav>

      {/* ✅ Spacer */}
      <div style={{ height: showBanner ? "72px" : "56px" }}></div>
    </>
  );
}
