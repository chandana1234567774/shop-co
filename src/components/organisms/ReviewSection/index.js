"use client";

import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";
import en from "@messages/en.json";

export default function ReviewSection({ reviews, renderStars }) {
  const productData = en.ProductPage || {};
  const { VERIFIED_ICON } = IMAGES;

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {productData.allReviews} ({reviews.length})
        </h2>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
          <select className="px-4 py-2 rounded-full bg-gray-100 border-none cursor-pointer focus:outline-none">
            <option>{productData.latest}</option>
            <option>{productData.oldest}</option>
            <option>{productData.highestRated}</option>
          </select>
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
