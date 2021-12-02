import * as ElementUISaaSExtend from "./saas-extend";

declare module "vue/types/vue" {
  interface Vue {
    $t: (key: string) => string;
  }
}

export * from "./saas-extend";
export default ElementUISaaSExtend;
