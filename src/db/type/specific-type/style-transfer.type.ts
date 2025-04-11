import { BaseType } from "./base.type";

export interface StyleTransferTask extends BaseType {
  input: {
    oriImageFile: string;
    refImageFile: string;
  };
  output: string[];
}
