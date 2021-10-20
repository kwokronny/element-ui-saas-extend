import defaultLang from "./lang/zh-CN.js";
import { result } from "lodash";
let lang: Record<string, any> = defaultLang;

export const t = function(path: string) {
  return result(lang, path) || "";
};

export const use = function(l: Record<string, any>) {
  lang = l || lang;
};

export default { use, t };
