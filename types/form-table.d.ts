import { ElAutoOption, ElAutoMixinOptions, ElFormAutoField } from "./form-auto";
import { ElForm, ValidateFieldCallback } from "element-ui/types/form";

export interface ElAutoMixinOptions extends ElAutoMixinOptions {}
export interface ElAutoOption extends ElAutoOption {}
export declare interface ElFormTableField extends ElFormAutoField {
  columnProps?: Record<string, any>;
}

export declare class ElFormTable extends ElForm {
  /** 表单项配置 */
  maxlength: number;

  data: Record<string, ElFormAutoField>;

  hiddenOption: boolean;

  hiddenAdd: boolean;

  removeConfirmMessage: string | boolean;

  getModel(): Record<string, any>[];

  setModel(model: Record<string, any>[]): void;

  setRow(
    index: number,
    modelOrName: Record<string, any>[] | string,
    value?: any
  ): void;

  addRow(model?: Record<string, any>[]): void;

  removeRow(index: number): void;

  validateField(
    props: string | string[],
    callback?: ValidateFieldCallback | undefined,
    index?: number
  ): void;
}
