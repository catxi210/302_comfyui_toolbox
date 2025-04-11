import { BaseType } from "./base.type";

export interface FaceSwapperTask extends BaseType {
  input: {
    faceImageFile: string;
    targetImageFile: string;
    filmFilter: boolean;
  };
  output: string[];
}
