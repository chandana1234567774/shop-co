"use client";

import { useState } from "react";
import en from "@messages/en.json";
import { IMAGES } from "@/constants/image-constants";
import Image from "next/image";
import fetchImage from "@/utils/image-utils";

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
      <section className="bg-white pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="bg-black text-white rounded-2xl sm:rounded-3xl py-6 sm:py-8 md:py-10 px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 -mb-16 sm:-mb-20 relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-center md:text-left md:max-w-[50%] lg:max-w-[45%]">
              {newsletter.TitleLine1} <br />
              {newsletter.TitleLine2}
            </h2>

            <div className="flex flex-col items-stretch gap-3 w-full md:w-[45%] lg:w-[40%]">
              <div className="relative w-full">
                <div className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5">
                  <Image
                    src={fetchImage(IMAGES.EMAIL_ICON)}
                    alt="Email Icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder={newsletter.Placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                  className="w-full h-12 bg-white text-black placeholder-gray-500 rounded-full pl-11 sm:pl-12 pr-4 sm:pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base shadow-sm"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full h-12 bg-white text-black font-medium text-sm sm:text-base rounded-full px-6 hover:bg-gray-100 active:bg-gray-200 transition"
              >
                {newsletter.Button}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 border-t border-gray-300 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                {footer.BrandName}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {footer.Description}
              </p>

              <div className="flex gap-3 sm:gap-4">
                <a href="#" className="hover:opacity-75 transition-opacity">
                  <Image
                    src={fetchImage(IMAGES.TWITTER_ICON)}
                    alt="Twitter"
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  <Image
                    src={fetchImage(IMAGES.FACEBOOK_ICON)}
                    alt="Facebook"
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  <Image
                    src={fetchImage(IMAGES.INSTAGRAM_ICON)}
                    alt="Instagram"
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  <Image
                    src={fetchImage(IMAGES.GITHUB_ICON)}
                    alt="GitHub"
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </a>
              </div>
            </div>

            {Object.entries(footer.Columns).map(([key, col]) => (
              <div key={key} className="col-span-1">
                <h4 className="font-semibold text-black mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">
                  {col.Title}
                </h4>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 text-xs sm:text-sm">
                  {col.Links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-black transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-300 pt-4 sm:pt-6 gap-0 sm:gap-0">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              {footer.BottomText}
            </p>

            <div className="flex items-center gap-2 sm:gap-1 flex-wrap justify-center">
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
                  width={50}
                  height={32}
                  className="w-12 h-8 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
