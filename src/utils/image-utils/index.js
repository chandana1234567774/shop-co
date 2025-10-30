import { IMAGE_STORAGE_TYPE } from "@/constants/image-constants";

const LOCAL = { IMAGE_STORAGE_TYPE };

const getImagePath = (path) => {
  try {
    return require(`@/assets/${path}`).default;
  } catch (err) {
    console.warn(`⚠️ Image not found: ${path}. Using fallback image.`);
    return require("@/assets/home-page/Frame 32.png").default; // ✅ existing safe image
  }
};

const fetchImage = (path = "", type = LOCAL) => {
  if (path) {
    switch (type) {
      case LOCAL:
        return getImagePath(path);
    }
  } else {
    return getImagePath("home-page/Frame 32.png"); // ✅ fallback
  }
};

export default fetchImage;
