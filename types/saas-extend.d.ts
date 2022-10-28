// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DatePickerOptions, InstallationOptions } from "element-ui";
import Vue, { PluginObject } from "vue";

import { ElFormAuto, ElFormAutoField } from "./form-auto";
import { ElTablePage } from "./table-page";
import { ElFormTable } from "./form-table";
import { ElMorePopover } from "./more-popover";
import { ElNumberRange } from "./number-range";

export class FormAuto extends ElFormAuto {}
export class TablePage extends ElTablePage {}
export class NumberRange extends ElNumberRange {}
export class MorePopover extends ElMorePopover {}
export class FormTable extends ElFormTable {}

export declare interface ElAutoOption {
  icon?: string;
  label: string;
  type?: "primary" | "warning" | "info" | "danger";
  value: string | number;
  disabled?: boolean;
  children?: ElAutoOption[];
  props?: Record<string, any>;
}

export declare type ElAutoMixinOptions =
  | Record<string | number, string | number>
  | Array<string | ElAutoOption>;

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
  | "timeselect"
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
  options?:
    | ElAutoMixinOptions
    | ((query?: string, page?: number = 1) => Promise<ElAutoMixinOptions>);
  /**
   * type为check时
   * 去除 全选复选框
   * @default true
   */
  notAll?: boolean;
  allOption?: boolean;
  /**
   * type为select时
   * select可多选
   * @default true
   */
  multiple?: boolean;
  /**
   * type为select 且 remote 为 true 时
   * select 可滚动分页加载
   * @default true
   */
  loadScroll?: boolean;
  /**
   * type为 datetimerange,timerange,daterange,slider,numberrange 时 必填
   * 范围选择时返回的范围 值和会按顺序返回rangeName中的值
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

export interface SaaSInstallationOptions extends InstallationOptions {
  pickerOptions?: Record<"date" | "range", DatePickerOptions>;
  tablePage?: {
    buttonStyle?: Record<
      "plain" | "round" | "size" | "style" | "class",
      string | boolean
    >;
    searchCollapse?: boolean | number;
    pageLayout?: string;
  };
}

export function install(
  vue: typeof Vue,
  options: SaaSInstallationOptions
): void;

declare module "vue/types/vue" {
  interface Vue {
    $ELEMENT?: SaaSInstallationOptions;
    dispatch: (
      componentName: string,
      eventName: string,
      params?: any[]
    ) => void;
  }
}
