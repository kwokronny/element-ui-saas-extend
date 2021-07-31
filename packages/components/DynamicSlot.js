export default {
  name: 'DynamicSlot',
  functional: true,
  inject: ['slotRoot'],
  props: {
    name: String,
    data: Object,
    component: String
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render: (h, ctx) => {
    return h(ctx.props.component || "div", ctx.injections.slotRoot.$scopedSlots[ctx.props.name](ctx.props.data));
  }
};