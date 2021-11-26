import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";
import { t } from "../locale";

interface DirectiveElement extends HTMLElement {
  [name: string]: any;
}

export default {
  methods: {
    $t(path: string) {
      return t(path);
    },
  },
  directives: {
    copy: {
      bind: function(el: DirectiveElement, binding: DirectiveBinding, vnode: VNode): void {
        let clipboard = new window.ClipboardJS(el, {
          text: function() {
            return binding.value;
          },
          action: "copy",
        });
        let tooltip: HTMLSpanElement | null = document.querySelector(".element-ui-saas-extend-copy-tooltip");
        if (!tooltip) {
          tooltip = document.createElement("span");
          tooltip.className = "element-ui-saas-extend-copy-tooltip";
          tooltip.onanimationend = function() {
            if (tooltip) {
              tooltip.style.display = "none";
            }
          };
        }
        document.body.appendChild(tooltip);
        clipboard.on("success", function() {
          if (tooltip) {
            tooltip.style.display = "inline-block";
            tooltip.style.left = `${el.getBoundingClientRect().left + document.documentElement.scrollLeft}px`;
            tooltip.style.top = `${el.getBoundingClientRect().top + document.documentElement.scrollTop - 28}px`;
            tooltip.innerHTML = "复制成功";
          }
        });
        clipboard.on("error", function() {
          if (tooltip) {
            tooltip.style.display = "inline-block";
            tooltip.style.left = `${el.getBoundingClientRect().left + document.documentElement.scrollLeft}px`;
            tooltip.style.top = `${el.getBoundingClientRect().top + document.documentElement.scrollTop - 28}px`;
            tooltip.innerHTML = "复制失败";
          }
        });
        el._vClipboard = clipboard;
      },
      update: function(el: DirectiveElement, binding: DirectiveBinding): void {
        el._vClipboard.text = function() {
          return binding.value;
        };
      },
      unbind: function(el: DirectiveElement, binding: DirectiveBinding): void {
        if (el._vClipboard) {
          el._vClipboard.destroy();
          delete el._vClipboard;
        }
      },
    },
  },
};
