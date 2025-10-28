import Image from "next/image";
import fetchImage from "@/utils/image-utils";
import React from "react";

const StyleCard = ({ name, image, alt }) => {
  const imgSrc = fetchImage(image);

  return (
    <div className="relative rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]">
      <Image src={imgSrc} alt={alt} className="w-full h-[220px] object-cover" />
      <div className="absolute top-4 left-4">
        <span className="text-black text-lg font-semibold bg-white/80 px-3 py-1 rounded-md">
          {name}
        </span>
      </div>
    </div>
  );
};

export default StyleCard;
