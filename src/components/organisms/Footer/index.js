"use client";

import { useState } from "react";
import en from "@messages/en.json";
import { IMAGES } from "@/constants/image-constants";
import Image from "next/image";
import fetchImage from "@/utils/image-utils"; // ✅ fetchImage utility

export default function FooterWithNewsletter() {
  const [email, setEmail] = useState("");
  const newsletter = en.Sections?.Newsletter || {};
  const footer = en.Footer;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <>
      {/* ✅ Newsletter Section */}
      <section className="bg-white pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="bg-black text-white rounded-3xl py-8 px-8 sm:px-16 flex flex-col md:flex-row items-center justify-between gap-10 -mb-20 relative z-10">
            {/* LEFT - Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-center md:text-left md:max-w-[45%]">
              {newsletter.TitleLine1} <br />
              {newsletter.TitleLine2}
            </h2>

            {/* RIGHT - Input & Button */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center md:items-end gap-4 w-full md:w-[40%]"
            >
              <div className="relative w-full md:w-[80%]">
                {/* ✅ Email Image */}
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5">
                  <Image
                    src={fetchImage(IMAGES.EMAIL_ICON)}
                    alt="Email Icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>

                {/* Input Field */}
                <input
                  type="email"
                  required
                  placeholder={newsletter.Placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-black placeholder-gray-500 rounded-full pl-12 pr-6 py-3 focus:outline-none text-sm sm:text-base shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-white text-black font-medium text-sm sm:text-base rounded-full px-20 py-3 hover:bg-gray-100 transition w-full md:w-auto"
              >
                {newsletter.Button}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ Footer Section */}
      <footer className="bg-gray-100 pt-28 pb-16 border-t border-gray-300 relative z-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
            {/* Brand Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-black mb-4">
                {footer.BrandName}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {footer.Description}
              </p>

              {/* ✅ Social Media Icons replaced with Images */}
              <div className="flex gap-4 mt-6">
                <a href="#" className="hover:opacity-75 transition">
                  <Image
                    src={fetchImage(IMAGES.TWITTER_ICON)}
                    alt="Twitter"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </a>
                <a href="#" className="hover:opacity-75 transition">
                  <Image
                    src={fetchImage(IMAGES.FACEBOOK_ICON)}
                    alt="Facebook"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </a>
                <a href="#" className="hover:opacity-75 transition">
                  <Image
                    src={fetchImage(IMAGES.INSTAGRAM_ICON)}
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </a>
                <a href="#" className="hover:opacity-75 transition">
                  <Image
                    src={fetchImage(IMAGES.GITHUB_ICON)}
                    alt="GitHub"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Footer Columns */}
            {Object.entries(footer.Columns).map(([key, col]) => (
              <div key={key}>
                <h4 className="font-semibold text-black mb-6">{col.Title}</h4>
                <ul className="space-y-4 text-gray-600 text-sm">
                  {col.Links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-black transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ✅ Bottom Section with Bigger Payment Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-300 pt-6 text-gray-500 text-sm">
            <p>{footer.BottomText}</p>

            <div className="flex items-center mt-4 sm:mt-0 gap-4">
              {[
                IMAGES.VISA,
                IMAGES.MASTERCARD,
                IMAGES.PAYPAL,
                IMAGES.APPLE_PAY,
                IMAGES.GOOGLE_PAY,
              ].map((img, index) => (
                <Image
                  key={index}
                  src={fetchImage(img)}
                  alt={`Payment method ${index + 1}`}
                  width={80}
                  height={50}
                  className="object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
