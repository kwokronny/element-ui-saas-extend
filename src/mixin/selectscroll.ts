import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";

interface DirectiveElement extends HTMLElement {
  [name: string]: any;
}

export default {
  directives: {
    selectScroll: {
      bind: function(el: DirectiveElement, binding: DirectiveBinding, vnode: VNode): void {
        // 获取element-ui定义好的scroll盒子
        let SELECTWRAP_DOM: Element | null = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        if (SELECTWRAP_DOM) {
          SELECTWRAP_DOM.addEventListener("scroll", function() {
            //@ts-ignore
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            //监听下拉框是否滚动到底部，滚动到底部就加载下一页数据
            console.log(binding.value);
            binding.value.page++;
            if (condition) binding.value.props.remoteMethod();
          });
        }
      },
    },
  },
};
