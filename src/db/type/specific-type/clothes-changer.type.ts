import { DrawLine } from "@/components/business/paint/type";
import { BaseType } from "./base.type";

export interface ClothesChangerTask extends BaseType {
  input: {
    mode: "label" | "paint";
    clothesImageFile: string;
    clothesImgSegLabels: string[];
    modelImageFile: string;
    modelImgSegLabels: string[];
    modelMaskLines: DrawLine[];
    clothesMaskLines: DrawLine[];
  };
  output: { comparisonUrl: string; resultUrl: string };
}
