// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DatePickerOptions, InstallationOptions } from "element-ui";
import Vue, { PluginObject } from "vue";

import {
  ElFormAuto,
  ElFormAutoField,
  ElAutoMixinOptions,
  ElAutoOption,
} from "./form-auto";
import { ElTablePage } from "./table-page";
import { ElFormTable } from "./form-table";
import { ElMorePopover } from "./more-popover";
import { ElNumberRange } from "./number-range";

export interface ElFormAutoField extends ElFormAutoField {}

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

export class FormAuto extends ElFormAuto {}
export class FormTable extends ElFormTable {}

export class TablePage extends ElTablePage {}
export class NumberRange extends ElNumberRange {}
export class MorePopover extends ElMorePopover {}

export interface SaaSInstallationOptions extends InstallationOptions {
  pickerOptions?: Record<"date" | "range", DatePickerOptions>;
  tablePage?: {
    buttonStyle?: Record<
      "plain" | "round" | "size" | "style" | "class",
      string | boolean
    >;
    pageSizes?: number[];
    showOverflowTooltip?: boolean;
    searchCollapse?: boolean | number;
    pageLayout?: string;
    layoutType?: "card" | "default";
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
