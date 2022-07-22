import { ElAutoMixinOptions, ElAutoOption, ElFormAutoField } from "./saas-extend";
import { ElForm } from "element-ui/types/form";

export interface ElFormAutoField extends ElFormAutoField {}

export declare class ElFormAuto extends ElForm {
  /** 表单项配置 */
  data: Record<string, ElFormAutoField>;
  /** el-row 属性 gutter 栅格间格 */
  gutter: number;
  /** 所有表单项标签是否隐藏 */
  labelHidden: boolean;
  reset(): void;
  refreshOptions(field: string): void;
  getModel(): Record<string, any>;
  setModel(model: Record<string, any>): void;
}
