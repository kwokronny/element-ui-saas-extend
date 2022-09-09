import {
  ElAutoMixinOptions,
  ElAutoOption,
  ElFormAutoField,
} from "./saas-extend";
import { ElForm } from "element-ui/types/form";

export declare class ElFormTable extends ElForm {
  /** 表单项配置 */
  itemLimit: number;
  data: Record<string, ElFormAutoField>;
  getModel(): Record<string, any>[];
  setModel(model: Record<string, any>[]): void;
  addItem(model?: Record<string, any>[]): void;
  removeItem(index: number): void;
  clear(): void;
}
