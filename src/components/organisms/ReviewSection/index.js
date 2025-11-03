"use client";

import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";
import en from "@messages/en.json";

export default function ReviewSection({ reviews, renderStars }) {
  const productData = en.ProductPage || {};
  const { VERIFIED_ICON, FILTER_ICON } = IMAGES; // ✅ added filter icon

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">
          {productData.allReviews} ({reviews.length})
        </h2>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-100 transition flex items-center justify-center">
            <Image
              src={fetchImage(FILTER_ICON)}
              alt="Filter"
              width={20}
              height={20}
            />
          </button>

          <div className="relative">
            <select className="appearance-none px-3 py-2 rounded-full bg-gray-100 border-none cursor-pointer focus:outline-none pr-3">
              <option>{productData.latest}</option>
              <option>{productData.oldest}</option>
              <option>{productData.highestRated}</option>
            </select>

            <svg
              className="w-4 h-4 text-gray-500 absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none"
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
          <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
            {productData.writeReview}
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-xl p-6 relative"
          >
            {/* Three Dots */}
            <button className="absolute top-6 right-6 text-gray-400 hover:text-black transition">
              <BsThreeDots className="w-5 h-5" />
            </button>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {renderStars(review.rating)}
            </div>

            {/* Name and Verified */}
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-lg">{review.name}</h3>
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
            <p className="text-gray-600 mb-4 leading-relaxed">
              {review.review}
            </p>

            {/* Date */}
            <div className="text-sm text-gray-500">
              {productData.postedOn} {review.date}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 border-2 border-gray-200 rounded-full font-medium hover:bg-gray-50 transition">
          {productData.loadMoreReviews}
        </button>
      </div>
    </div>
  );
}
