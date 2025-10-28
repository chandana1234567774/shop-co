import { IMAGE_STORAGE_TYPE } from "@/constants/image-constants";

const LOCAL = { IMAGE_STORAGE_TYPE };

const getImagePath = (path) => require(`@/assets/${path}`).default;

const fetchImage = (path = "", type = LOCAL) => {
  if (path) {
    switch (type) {
      case LOCAL:
        return getImagePath(path);
    }
  } else {
    return getImagePath("default-image.jpg");
  }
};

export default fetchImage;
