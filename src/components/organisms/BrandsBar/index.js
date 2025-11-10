import Image from "next/image";
import fetchImage from "@/utils/image-utils";
import { IMAGES } from "@/constants/image-constants";

export default function BrandsBar() {
  const brands = [
    {
      key: "VERSACE",
      width: 150,
      height: 60,
    },
    {
      key: "ZARA",
      width: 120,
      height: 50,
    },
    {
      key: "GUCCI",
      width: 160,
      height: 60,
    },
    {
      key: "PRADA",
      width: 140,
      height: 55,
    },
    {
      key: "CALVIN",
      width: 130,
      height: 50,
    },
  ];

  return (
    <div className="w-full bg-black py-6 border-t border-b">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
        <div
          className="overflow-x-auto overflow-y-hidden"
          style={{
            scrollbarWidth: "none" ,
            msOverflowStyle: "none" 
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
          <div className="flex items-center justify-start lg:justify-between gap-10 min-w-max lg:min-w-0">
            {brands.map(({ key, width, height }) => (
              <div
                key={key}
                className="flex items-center justify-center w-[140px] sm:w-[160px] lg:w-[180px] h-[70px] sm:h-[80px] lg:h-[90px]"
              >
                <Image
                  src={fetchImage(IMAGES[key])}
                  alt={key}
                  width={width}
                  height={height}
                  className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
