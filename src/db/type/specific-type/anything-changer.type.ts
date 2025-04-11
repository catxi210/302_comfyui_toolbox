import { DrawLine } from "@/components/business/paint/type";
import { BaseType } from "./base.type";

export interface AnythingChangerTask extends BaseType {
  input: {
    mode: "description" | "paint";
    sourceImageFile: string;
    targetImageFile: string;
    sourceDescription: string;
    targetDescription: string;
    sourceMaskLines: DrawLine[];
    targetMaskLines: DrawLine[];
    smallObject: boolean;
  };
  output: { comparisonUrl: string; resultUrl: string };
}
