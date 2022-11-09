import {
  ElAutoMixinOptions,
  ElAutoOption,
  ElFormAutoField,
} from "./saas-extend";
import { ElForm, ValidateFieldCallback } from "element-ui/types/form";

export declare class ElFormTable extends ElForm {
  /** 表单项配置 */
  maxlength: number;

  data: Record<string, ElFormAutoField>;

  hiddenOption: boolean;

  hiddenAdd: boolean;

  removeConfirmMessage: string | boolean;

  getModel(): Record<string, any>[];

  setModel(model: Record<string, any>[]): void;

  setItem(
    index: number,
    modelOrName: Record<string, any>[] | string,
    value?: any
  ): void;

  addItem(model?: Record<string, any>[]): void;

  removeItem(index: number): void;

  validateField(
    props: string | string[],
    callback?: ValidateFieldCallback | undefined,
    index?: number
  ): void;
}
