import { RenderContext, CreateElement } from "vue/types/umd";

export default {
  functional: true,
  inject: ["slotRoot"],
  props: {
    name: String,
    data: Object,
    component: String,
  },
  render(h: CreateElement, ctx: RenderContext) {
    return h(ctx.props.component || "div", ctx.injections.slotRoot.$scopedSlots[ctx.props.name](ctx.props.data));
  },
};
