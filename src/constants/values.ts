/**
 * @fileoverview Global constants and configuration values used throughout the application.
 * @author zpl
 * @created 2024-11-20
 */

export const THEME_COOKIE_NAME = "theme";
export const EMPTY_THEME = "light";
export const TRUE_STRING = "true";
export const FALSE_STRING = "false";
export const CHINA_REGION = "0";
export const OUTSIDE_DEPLOY_MODE = "OUTSIDE";
export const INTERNAL_DEPLOY_MODE = "INTERNAL";
export const SHARE_CODE_URL_PARAM = "pwd";
export const SHARE_CODE_STORE_KEY = "share_code";
export const SHARE_CODE_REMEMBER_KEY = "share_code_remember";

export const GLOBAL = {
  /**
   * Internationalization (i18n) configuration settings.
   * @property {Object} LOCALE - Locale-related constants
   * @property {string[]} LOCALE.SUPPORTED - List of supported language codes:
   *   - 'zh': Chinese
   *   - 'en': English
   *   - 'ja': Japanese
   * @property {string} LOCALE.DEFAULT - Default language code (English)
   */
  LOCALE: {
    SUPPORTED: ["zh", "en", "ja"],
    DEFAULT: "en",
  },
  WORKFLOWS: {
    SUPPORTED: [
      "clothes_changer",
      "face_swapper",
      "anything_changer",
      "image_to_reality",
      "style_transfer",
    ],
    DEFAULT: "clothes_changer",
  },
  CLOTHES_CHANGER_SEG_LABELS: {
    SUPPORTED: [
      {
        label: "face",
        value: "0",
      },
      {
        label: "hair",
        value: "1",
      },
      {
        label: "hat",
        value: "2",
      },
      {
        label: "sunglass",
        value: "3",
      },
      {
        label: "left_arm",
        value: "4",
      },
      {
        label: "right_arm",
        value: "5",
      },
      {
        label: "left_leg",
        value: "6",
      },
      {
        label: "right_leg",
        value: "7",
      },
      {
        label: "left_shoe",
        value: "8",
      },
      {
        label: "right_shoe",
        value: "9",
      },
      {
        label: "upper_clothes",
        value: "10",
      },
      {
        label: "skirt",
        value: "11",
      },
      {
        label: "pants",
        value: "12",
      },
      {
        label: "dress",
        value: "13",
      },
      {
        label: "belt",
        value: "14",
      },
      {
        label: "bag",
        value: "15",
      },
      {
        label: "scarf",
        value: "16",
      },
    ],
    DEFAULT: {
      label: "upper_clothes",
      value: "10",
    },
  },
  IMAGE_TO_REALITY_TARGET_TYPE: {
    SUPPORTED: [
      {
        label: "asian",
        value: "0",
      },
      {
        label: "westerner",
        value: "1",
      },
    ],
    DEFAULT: {
      label: "asian",
      value: "0",
    },
  },
};
