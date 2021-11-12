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
        clipboard.on("success", function() {});
        clipboard.on("error", function() {});
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
