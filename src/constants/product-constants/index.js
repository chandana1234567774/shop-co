import fetchImage from "@/utils/image-utils";
import { IMAGES } from "../image-constants";

export const PRODUCTS = {
  // 🆕 NEW ARRIVALS
  newArrivals: [
    {
      id: 1,
      name: "T-shirt with Tape details",
      price: 120,
      image: fetchImage(IMAGES.BLACK_TSHIRT),
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

  // 🛒 TOP SELLING
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

  // 💡 YOU MIGHT ALSO LIKE
  youMightAlsoLike: [
    {
      id: 9,
      name: "Polo with Contrast Trims",
      price: 212,
      oldPrice: 242,
      rating: 4.0,
      discount: "-20%",
      image: fetchImage(IMAGES.SHIRT),
    },
    {
      id: 10,
      name: "Gradient Graphic T-shirt",
      price: 145,
      rating: 3.6,
      image: fetchImage(IMAGES.MIX_SHIRT),
    },
    {
      id: 11,
      name: "Polo with Tipping Details",
      price: 180,
      rating: 4.5,
      image: fetchImage(IMAGES.BROWN_SHIRT),
    },
    {
      id: 12,
      name: "Black Striped T-shirt",
      price: 120,
      oldPrice: 160,
      discount: "-30%",
      rating: 5.0,
      image: fetchImage(IMAGES.BLACK_SHIRT),
    },
  ],
};

// 👕 CATEGORY PRODUCTS
export const CATEGORY_PRODUCTS = [
  {
    id: 1,
    name: "T-shirt",
    price: 145,
    oldPrice: 260,
    image: fetchImage(IMAGES.T_SHIRT),
  },
  {
    id: 2,
    name: "Polo Shirt",
    price: 180,
    oldPrice: 300,
    image: fetchImage(IMAGES.POLO_SHIRT),
  },
  {
    id: 3,
    name: "Black Shirt",
    price: 120,
    oldPrice: 150,
    image: fetchImage(IMAGES.BALCK_SHIRT), // ✅ matches your IMAGES key spelling
  },
  {
    id: 4,
    name: "Jeans",
    price: 240,
    oldPrice: 300,
    image: fetchImage(IMAGES.JEANS),
  },
  {
    id: 5,
    name: "Blue Shirt",
    price: 180,
    oldPrice: 210,
    image: fetchImage(IMAGES.BLUE_SHIRT),
  },
  {
    id: 6,
    name: "Sleeve T-shirt",
    price: 80,
    oldPrice: 120,
    image: fetchImage(IMAGES.SLEEVE_TSHIRT),
  },
];
