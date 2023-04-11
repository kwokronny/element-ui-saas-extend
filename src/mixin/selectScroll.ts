import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";

interface DirectiveElement extends HTMLElement {
  [name: string]: any;
}

export default {
  directives: {
    selectScroll: {
      bind: function (el: DirectiveElement, binding: DirectiveBinding, vnode: VNode): void {
        let SELECTWRAP_DOM: Element | null = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        if (SELECTWRAP_DOM && typeof binding.value == "function") {
          SELECTWRAP_DOM.addEventListener("scroll", function (this: Element) {
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            //监听下拉框是否滚动到底部，滚动到底部就加载下一页数据
            if (condition) binding.value();
          });
        }
      },
    },
  },
};
