import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui";
import { shallowMount } from "@vue/test-utils";
import ElementUISaaSExtend from "../packages/index";

Vue.use(Element);
Vue.use(ElementUISaaSExtend);

export const wait = function(ms = 50) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export const createTest = function(Comp, options) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  options.attachTo = true;
  return shallowMount.call(Comp, options);
};
