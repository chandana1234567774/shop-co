import { useTranslations } from "next-intl";
import messages from "../../messages/en.json";
import { toast } from "react-toastify";

export const useTranslation = (namespace) => {
  const t = useTranslations(namespace);
  const result = Object.keys(messages[namespace]).reduce((acc, key) => {
    acc[key] = t(key);
    return acc;
  }, {});
  return result;
};

export const useToast = () => {
  const showToast = (message, options = {}) => {
    const {
      type = "success",
      position = "top-right",
      autoClose = 10000,
      hideProgressBar = false,
      closeOnClick = true,
      pauseOnHover = true,
      progress = undefined,
      theme = "light",
    } = options;

    toast(message, {
      type,
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      progress,
      theme,
    });
  };

  return { showToast };
};
