import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";

interface DirectiveElement extends HTMLElement {
  [name: string]: any;
}

export default {
  directives: {
    selectScroll: {
      bind: function(el: DirectiveElement, binding: DirectiveBinding, vnode: VNode): void {
        let SELECTWRAP_DOM: Element | null = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        let SELECT_INPUT: HTMLInputElement | null = el.querySelector("input");
        if (SELECTWRAP_DOM && binding.value.remote && binding.value.loadScroll) {
          SELECTWRAP_DOM.addEventListener("scroll", function() {
            let query = SELECT_INPUT?.value || "";
            //@ts-ignore
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            //监听下拉框是否滚动到底部，滚动到底部就加载下一页数据
            if (condition) binding.value.props.remoteMethod(query, true);
          });
        }
      },
    },
  },
};
