import omit from "lodash-es/omit";
import { ElAutoMixinOptions, ElAutoOption } from "types/saas-extend";

export async function transformOptions(options: ElAutoMixinOptions | ((query?: string) => any), transition: boolean = true): Promise<any> {
  if (options instanceof Function) {
    options = (await options()) as ElAutoMixinOptions;
    if (!transition) return options;
  }
  const arr: ElAutoOption[] = [];
  const isArray: boolean = Array.isArray(options);
  for (const key in options) {
    const item: any = options[key];
    let props = {};
    if (typeof item == "object") props = omit(item, ["label", "value", "disabled", "icon", "children"]);
    if (item) {
      arr.push({
        label: item.label || item,
        value: isArray ? (item.value === undefined ? item : item.value) : key,
        disabled: item.disabled || false,
        icon: item.icon || false,
        children: item.children || [],
        props,
      });
    }
  }
  return arr;
}
