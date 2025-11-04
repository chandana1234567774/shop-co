import { IMAGE_STORAGE_TYPE } from "@/constants/image-constants";

// Use the actual string constant, not an object
const LOCAL = IMAGE_STORAGE_TYPE.LOCAL;

const getImagePath = (path) => {
  try {
    // ✅ Load local image safely
    return require(`@/assets/${path}`).default;
  } catch (err) {
    console.warn(`⚠️ Image not found: ${path}. Using fallback image.`);
    // ✅ Fallback to a default safe image
    return require("@/assets/home-page/Frame 32.png").default;
  }
};

const fetchImage = (path = "", type = LOCAL) => {
  if (path) {
    switch (type) {
      case IMAGE_STORAGE_TYPE.LOCAL:
        return getImagePath(path);
      default:
        console.warn("⚠️ Unknown image storage type. Using local by default.");
        return getImagePath(path);
    }
  } else {
    // ✅ If no path provided, always use fallback
    return getImagePath("home-page/Frame 32.png");
  }
};

export default fetchImage;
