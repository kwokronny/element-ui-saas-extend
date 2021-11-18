import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";

interface DirectiveElement extends HTMLElement {
  [name: string]: any;
}

export default {
  directives: {
    selectScroll: {
      bind: function(el: DirectiveElement, binding: DirectiveBinding, vnode: VNode): void {
        console.log(el);
        let SELECTWRAP_DOM: Element | null = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        let SELECT_INPUT: HTMLInputElement | null = el.querySelector("input.el-select__input");
        if (SELECTWRAP_DOM && SELECT_INPUT) {
          let query = SELECT_INPUT.value;
          SELECTWRAP_DOM.addEventListener("scroll", function() {
            //@ts-ignore
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            //监听下拉框是否滚动到底部，滚动到底部就加载下一页数据
            if (condition) binding.value.props.remoteMethod(query);
          });
        }
      },
    },
  },
};
