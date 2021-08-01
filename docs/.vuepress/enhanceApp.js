import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ElementUISaaSExtend from "/packages/index.ts";
import "/packages/theme-chalk/lib/index.css";

import axios from "axios";

import numeral from "numeral";
import dayjs from "dayjs";

import Mock from "mockjs";

export default ({
  Vue,
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  Vue.use(ElementUI);
  Vue.prototype.$axios = axios;
  Vue.prototype.$mock = Mock;

  Vue.filter("numeral", function(value, format) {
    return numeral(value).format(format);
  });

  Vue.filter("date", function(value) {
    return dayjs(value).format("YYYY-MM-DD");
  });

  Vue.filter("datetime", function(value) {
    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
  });

  Vue.filter("dayjs", function(value, format) {
    return dayjs(value).format(format);
  });

  Vue.filter("yuan", function(value) {
    return `${value} 元`;
  });

  Vue.prototype.$ELEMENT = {
    pickerOptions: {
      date: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      range: {
        shortcuts: [
          {
            text: "近1周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近1月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近3月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    },
  };
  if (!isServer) {
    import("/packages/index.ts").then((module) => {
      Vue.use(ElementUISaaSExtend);
    });
    import("./components/UserSelector.vue").then((module) => {
      Vue.component(module.name, module);
    });
  }
};
