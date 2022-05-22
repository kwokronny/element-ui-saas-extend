import { CreateElement } from "vue/types/umd";
import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";

@Component({
  name: "TableButton",
})
export default class TableButton extends Vue {
  @Prop({ type: Number, default: 2 }) maxLimit!: number;

  @Prop({ type: String, default: "..." }) moreText!: string;
  @Prop({
    type: Object,
    default: () => {
      return {};
    },
  })
  buttonProp!: Record<string, any>;

  private render(h: CreateElement) {
    // @ts-ignore
    let slots = (this.$slots && this.$slots.default) || [];
    slots = slots.filter((item) => item.context);

    // @ts-ignore
    let moreBtn = this.$slots && this.$slots.more;

    let ellipsisBtn: VNode[] = [
      h(
        "span",
        {
          directives: [
            {
              name: "popover",
              arg: "ElTableButtonPopover",
            },
          ],
          props: Object.assign({}, { type: "default" }),
        },
        moreBtn
      ),
    ] || [
      h(
        "el-button",
        {
          directives: [
            {
              name: "popover",
              arg: "ElTableButtonPopover",
            },
          ],
          props: Object.assign({}, { type: "default" }),
        },
        this.moreText
      ),
    ];
    let needPopover = slots.length > this.maxLimit;
    ellipsisBtn.push(h("el-popover", { ref: "ElTableButtonPopover" }, [h("div", slots.slice(this.maxLimit, slots.length))]));
    let view = slots.slice(0, this.maxLimit);
    if (needPopover) {
      view = view.concat(ellipsisBtn);
    }
    return h("div", view);
  }
}
