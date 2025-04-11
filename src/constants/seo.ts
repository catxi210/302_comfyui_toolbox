export type SEOData = {
  supportLanguages: string[];
  fallbackLanguage: string;
  languages: Record<
    string,
    { title: string; description: string; image: string }
  >;
};

export const SEO_DATA: SEOData = {
  // TODO: Change to your own support languages
  supportLanguages: ["zh", "en", "ja"],
  fallbackLanguage: "en",
  // TODO: Change to your own SEO data
  languages: {
    zh: {
      title: "ComfyUI工具箱",
      description: "通过ComfyUI复杂工作流实现多种变换效果",
      image: "/images/global/desc_zh.png",
    },
    en: {
      title: "ComfyUI Toolbox",
      description:
        "Achieve various transformation effects through complex ComfyUI workflows",
      image: "/images/global/desc_en.png",
    },
    ja: {
      title: "ComfyUIツールボックス",
      description: "ComfyUIの複雑なワークフローで様々な変換効果を実現",
      image: "/images/global/desc_ja.png",
    },
  },
};
