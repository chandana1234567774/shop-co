"use client";

import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";
import en from "@messages/en.json";

export default function ReviewSection({ reviews, renderStars }) {
  const productData = en.ProductPage || {};
  const { VERIFIED_ICON, FILTER_ICON } = IMAGES;

  return (
    <div className="py-8 md:py-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          {productData.allReviews}
          <span className="text-gray-500 text-lg font-normal">(450)</span>
        </h2>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Icon */}
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">
            <Image
              src={fetchImage(FILTER_ICON)}
              alt="Filter"
              width={20}
              height={20}
            />
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select className="appearance-none px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none pr-8 cursor-pointer hover:bg-gray-200 transition">
              <option>{productData.latest}</option>
              <option>{productData.oldest}</option>
              <option>{productData.highestRated}</option>
            </select>

            <svg
              className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Write Review Button */}
          <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition text-sm">
            {productData.writeReview}
          </button>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-xl p-6 relative bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Menu Three Dots */}
            <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition">
              <BsThreeDots className="w-5 h-5" />
            </button>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {renderStars(review.rating)}
            </div>

            {/* Name + Verified */}
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-lg">{review.name}</h3>
              {review.verified && (
                <Image
                  src={fetchImage(VERIFIED_ICON)}
                  alt="verified"
                  width={20}
                  height={20}
                />
              )}
            </div>

            {/* Review Text */}
            <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
              {review.review}
            </p>

            {/* Date */}
            <p className="text-sm text-gray-500">
              {productData.postedOn} {review.date}
            </p>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <button className="px-10 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition text-sm md:text-base">
          {productData.loadMoreReviews}
        </button>
      </div>
    </div>
  );
}
