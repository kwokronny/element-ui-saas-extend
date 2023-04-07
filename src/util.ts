import { ElAutoMixinOptions, ElAutoOption } from "types/saas-extend";

// 将不同的options值换成统一格式
export async function transformOptions(
  options: ElAutoMixinOptions | ((query?: string) => any),
  transition: boolean = true
): Promise<any> {
  if (options instanceof Function) {
    options = (await options()) as ElAutoMixinOptions;
    if (!transition) return options;
  }
  const arr: ElAutoOption[] = [];
  const isArray: boolean = Array.isArray(options);
  for (const key in options) {
    const item: any = options[key];
    if (item) {
      let option = {
        label: item.label || item,
        value: isArray ? (item.value === undefined ? item : item.value) : key,
        disabled: item.disabled || false,
        icon: item.icon || false,
        children: item.children || [],
      };
      if (typeof item == "object") option = Object.assign({}, item, option);
      arr.push(option);
    }
  }
  return arr;
}
