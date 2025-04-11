import { BaseType } from "./base.type";

export interface ImageToRealityTask extends BaseType {
  input: {
    imageFile: string;
    targetType: string;
  };
  output: string[];
}
