const { getRequestConfig } = require("next-intl/server");

module.exports = getRequestConfig(async () => {
  const locale = "en";
  const messages = require(`../../messages/${locale}.json`);

  return {
    locale,
    messages,
  };
});
