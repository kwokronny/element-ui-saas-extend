import { ElFormAutoField } from "./form-auto";
import { ElTable } from "element-ui/types/table";

export declare class ElTablePage extends ElTable {
  /** 表单项配置 */
  columns: ElTablePageColumn[];
  /** el-row 属性 gutter 栅格间格 */
  request: (page: number, search: Record<string, any>, pageSize: number, from: "search" | "request_change" | "page_change") => Record<ElTablePageDataMap, any>;
  pageSize: number;
  pageLayout: string;
  pageSizes: number[];
  layoutType: "default" | "card";
  buttonStyle: Record<"plain" | "round", boolean>;
  selectable: (row: Record<string, any>, index: number) => boolean;
  selection: any[];
  customColumns: string;
  /** 所有表单项标签是否隐藏 */
  labelHidden: boolean;
  search(): void;
  resetSearch(): void;
  openCustomColumnDialog(): void;
  clearSelection(): void;
  getParams(): Record<string, any>;
}

export declare type ElTablePageDataMap = "page" | "pageSize" | "total" | "record";

export declare interface ElTablePageColumn {
  prop: string;
  label: string;
  labelTooltip?: string;
  fixed?: boolean | "left" | "right";
  slot?: boolean | string;
  hide?: boolean;
  filters?: string | Array<string | any[]>;
  filtersFunc?: (value: string) => string;
  enum?: Record<string | number, string>;
  splitChar?: string;
  search?: ElFormAutoField;
  addSearch?: Record<string, ElFormAutoField>;
  [name: string]: any;
}
