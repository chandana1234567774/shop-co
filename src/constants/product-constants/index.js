import fetchImage from "@/utils/image-utils";
import { IMAGES } from "../image-constants";

export const PRODUCTS = {
  newArrivals: [
    {
      id: 1,
      name: "T-shirt with Tape details",
      price: 120,
      image: fetchImage(IMAGES.BLACK_TSHIRT), // ✅ using util
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      price: 240,
      oldPrice: 260,
      rating: 3.5,
      discount: "-20%",
      image: fetchImage(IMAGES.SKINNY_JEANS),
    },
    {
      id: 3,
      name: "Checkered Shirt",
      price: 180,
      image: fetchImage(IMAGES.CHECKERED_SHIRT),
    },
    {
      id: 4,
      name: "Sleeve Striped T-Shirt",
      price: 130,
      oldPrice: 160,
      discount: "-30%",
      image: fetchImage(IMAGES.STRIPED_TSHIRT),
    },
  ],

  topSelling: [
    {
      id: 5,
      name: "Vertical Striped Shirt",
      price: 212,
      oldPrice: 232,
      rating: 5.0,
      discount: "-20%",
      image: fetchImage(IMAGES.GREEN_SHIRT),
    },
    {
      id: 6,
      name: "Courage Graphic T-Shirt",
      price: 145,
      rating: 4.0,
      image: fetchImage(IMAGES.ORANGE_TSHIRT),
    },
    {
      id: 7,
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      rating: 3.0,
      image: fetchImage(IMAGES.BLUE_SHORTS),
    },
    {
      id: 8,
      name: "Fadded Skinny Jeans",
      price: 210,
      rating: 4.5,
      image: fetchImage(IMAGES.SKINNY_JEANS),
    },
  ],
};
