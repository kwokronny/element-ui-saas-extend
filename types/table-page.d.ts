import { ElFormAutoField } from "./form-auto";
import { ElTable } from "element-ui/types/table";

export declare class ElTablePage extends ElTable {
  /** 表单项配置 */
  columns: ElTablePageColumn[];
  /** el-row 属性 gutter 栅格间格 */
  request: (page: number, search: Record<string, any>, pageSize: number) => Promise<Record<ElTablePageDataMap, any> | Record<string, any>[]>;
  pageSize: number;
  pageLayout: string;
  pageSizes: number[];
  layoutType: "default" | "card";
  buttonStyle: Record<"plain" | "round" | "size" | "style" | "class", string | boolean>;
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
  children?: ElTablePageColumn[];
  filtersFunc?: (value: string) => any;
  enum?: ElAutoMixinOptions | ((query?: string) => Promise<ElAutoMixinOptions>);
  splitChar?: string;
  search?: ElFormAutoField;
  addSearch?: Record<string, ElFormAutoField>;
  copy?: boolean | ((row: Record<string, any>) => string);
  [name: string]: any;
}
