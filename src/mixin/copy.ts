import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";
import { t } from "../locale";
interface DirectiveElement extends HTMLElement {
  [name: string]: any;
}

export default {
  directives: {
    copy: {
      bind: function(el: DirectiveElement, binding: DirectiveBinding, vnode: VNode): void {
        // let copyText = binding.value;
        let text: any = undefined;
        if (typeof binding.value == "function") {
          text = binding.value;
        } else {
          text = function() {
            return `${binding.value}`;
          };
        }
        let clipboard = new window.ClipboardJS(el, {
          text,
        });
        let tooltip: HTMLSpanElement | null = document.querySelector(".element-ui-saas-extend-copy-tooltip");
        if (!tooltip) {
          tooltip = document.createElement("div");
          tooltip.className = "element-ui-saas-extend-copy-tooltip el-tooltip__popper is-dark";
          tooltip.style.display = "none";
          tooltip.onanimationend = function() {
            if (tooltip) {
              tooltip.style.display = "none";
            }
          };
        }
        document.body.appendChild(tooltip);
        clipboard.on("success", function() {
          if (tooltip) {
            tooltip.style.display = "none";
            let tipText = el.getAttribute("element-copy-success-text") || t("copy.success");
            let theme = el.getAttribute("element-copy-tooltip-theme") || "dark";
            tooltip.className = tooltip.className.replace(/is-(dark|light)$/, `is-${theme}`);
            tooltip.style.left = `${el.getBoundingClientRect().left + document.documentElement.scrollLeft}px`;
            tooltip.style.top = `${el.getBoundingClientRect().top + document.documentElement.scrollTop - 35}px`;
            tooltip.innerHTML = `${tipText}`;
            setTimeout(function() {
              tooltip && (tooltip.style.display = "inline-block");
            }, 0);
          }
        });
        clipboard.on("error", function() {
          if (tooltip) {
            tooltip.style.display = "none";
            let tipText = el.getAttribute("element-copy-faild-text") || t("copy.faild");
            let theme = el.getAttribute("element-copy-tooltip-theme") || "dark";
            tooltip.className = tooltip.className.replace(/is-(dark|light)$/, `is-${theme}`);
            tooltip.style.left = `${el.getBoundingClientRect().left + document.documentElement.scrollLeft}px`;
            tooltip.style.top = `${el.getBoundingClientRect().top + document.documentElement.scrollTop - 35}px`;
            tooltip.innerHTML = `${tipText}`;
            setTimeout(function() {
              tooltip && (tooltip.style.display = "inline-block");
            }, 0);
          }
        });
        el._vClipboard = clipboard;
      },
      update: function(el: DirectiveElement, binding: DirectiveBinding): void {
        if (typeof binding.value == "function") {
          el._vClipboard.text = binding.value;
        } else {
          el._vClipboard.text = function() {
            return `${binding.value}`;
          };
        }
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
