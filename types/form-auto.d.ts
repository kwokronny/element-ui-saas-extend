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

export declare interface ElFormAutoField {
  /**
   * 组件引用col
   */
  col?: number;
  /**
   * 标签名，可空
   */
  label?: string;
  /**
   * 默认值，可空
   */
  value?: any;
  /**
   * 字段类型，根据字段类型使用不同的组件
   */
  type: ElFormAutoFieldType;
  /**
   * 是否隐藏标签
   * @default false
   */
  labelHidden?: boolean;
  /**
   * 表单项提示
   */
  labelTooltip?: string;
  /**
   * 设置标签宽度
   */
  labelWidth?: string;
  /**
   * 是否禁用字段
   * @default false
   */
  disabled?: boolean;
  /**
   * 字段是否必填
   * @default false
   */
  required?: boolean;
  /**
   * 字段追加验证规则
   * 根据element rules方式
   */
  addRules?: any[];
  /**
   * 表单返回数据时不获取该字段
   * @default false
   */
  notSubmit?: boolean;
  /**
   * 改用动态插槽自定义
   * @default false
   */
  slot?: boolean | string;
  /**
   * 绑定显示，(model)=>{return boolean}
   * model为表单所有字段值
   * @default false
   */
  bindShow?: (model: Record<string, any>) => boolean;
  /** */
  remote?: boolean;
  /**
   * type为select,check,radio,cascader时
   * 选项数组，支持Promise
   * @default false
   */
  options?: ElAutoMixinOptions | ((query?: string, page?: number = 1) => Promise<ElAutoMixinOptions>);
  /**
   * type为check时
   * 去除 全选复选框
   * @default true
   */
  checkAll?: boolean;
  /**
   * type为select时
   * select可多选
   * @default true
   */
  multiple?: boolean;
  /**
   * type为 datetimerange,timerange,daterange,slider,numberrange 时 必填
   * 范围选择时返回的范围 值和会按顺序返回rangeName中的值
   * rangeName:['startTime','endTime']
   * //output:
   * {
   *    startTime:"00:00:00"
   *    endTime:"10:00:00"
   * }
   */
  rangeName?: [string, string];
  /**
   * 【选填】type为 daterange 时
   * 为范围时间的起始时间加上 00:00:00 及结束时间加上 23:59:59 值，便于后端数据库检索
   * @default false
   */
  suffixTime?: boolean;
  component?: string;

  [name: string]: any;
  /**
   * 自定义增加事件
   * @default false
   */
  on?: Record<string, (...args: any[]) => void>;
}

export declare class ElFormAuto extends ElForm {
  /** 表单项配置 */
  data: Record<string, ElFormAutoField>;
  /** el-row 属性 gutter 栅格间格 */
  gutter: number;
  /** 所有表单项标签是否隐藏 */
  labelHidden: boolean;
  reset(): void;
  getModel(): Record<string, any>;
  setModel(model: Record<string, any>): void;
}
