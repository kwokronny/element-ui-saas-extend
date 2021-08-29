import { ElAutoMixinOptions, ElAutoOption } from "types/saas-extend";

export async function transformOptions(options: ElAutoMixinOptions | ((query?: string) => any)): Promise<ElAutoOption[]> {
  if (options instanceof Function) {
    options = (await options("")) as ElAutoMixinOptions;
  }
  const arr: ElAutoOption[] = [];
  const isArray: boolean = Array.isArray(options);
  for (const key in options) {
    const item: any = options[key];
    if (item) {
      arr.push({
        label: item.label || item,
        value: isArray ? (item.value === undefined ? item : item.value) : key,
        disabled: item.disabled || false,
        icon: item.icon || false,
      });
    }
  }
  return arr;
}

export function arrayToRecord(arr: any[], { key, value }: { key: string; value: string }): Record<string, any> {
  const map: Record<string, any> = {};
  arr.forEach((item) => {
    map[`${item[key]}`] = Object.assign({ label: `${item[value]}` }, item);
  });
  return map;
}
