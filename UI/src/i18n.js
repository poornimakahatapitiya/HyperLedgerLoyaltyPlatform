import i18n from "i18next";
import common_en from "./translations/en/common.json";
import common_si from "./translations/si/common.json";
import common_ta from "./translations/ta/common.json";

i18n.init({
  lng: "en",
  resources: {
    en: {
      common: common_en,
    },
    si: {
      common: common_si,
    },
    ta: {
      common: common_ta,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
