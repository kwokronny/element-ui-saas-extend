import { ElAutoMixinOptions } from "./saas-extend";
import { ElForm } from "element-ui/types/form";
import { ElAutoOption } from "types";
export declare type ElFormAutoFieldType =
  | "hidden"
  | "plain"
  | "text"
  | "numberrange"
  | "component"
  | "password"
  | "number"
  | "textarea"
  | "slider"
  | "switch"
  | "year"
  | "month"
  | "week"
  | "date"
  | "dates"
  | "time"
  | "datetime"
  | "timerange"
  | "monthrange"
  | "daterange"
  | "datetimerange"
  | "radio"
  | "radiobutton"
  | "check"
  | "select"
  | "cascader"
  | "rate";


export declare class ElFormAuto extends ElForm {
  /** 表单项配置 */
  data: Record<string, ElFormAutoField>;
  /** el-row 属性 gutter 栅格间格 */
  gutter: number;
  /** 所有表单项标签是否隐藏 */
  labelHidden: boolean;
  reset(): void;
  refreshOptions(field: string): void;
  getModel(): Record<string, any>[];
  setModel(model: Record<string, any>[]): void;
}
