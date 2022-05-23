import { CreateElement } from "vue/types/umd";
import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";

@Component({
  name: "ButtonGroup",
})
export default class TableButton extends Vue {
  @Prop({ type: Number, default: 3 }) maxLimit!: number;
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

    let ellipsisBtn: VNode[] = moreBtn
      ? [
          h(
            "span",
            {
              directives: [
                {
                  name: "popover",
                  arg: "ElTableButtonPopover",
                },
              ],
            },
            moreBtn
          ),
        ]
      : [
          h(
            "el-button",
            {
              directives: [
                {
                  name: "popover",
                  arg: "ElTableButtonPopover",
                },
              ],
              props: Object.assign({}, this.buttonProp),
            },
            this.moreText
          ),
        ];
    let needPopover = slots.length > this.maxLimit;
    ellipsisBtn.push(
      h(
        "el-popover",
        {
          ref: "ElTableButtonPopover",
          props: {
            width: 100,
            popperClass: "el-table-button__popover",
          },
        },
        [h("div", slots.slice(this.maxLimit, slots.length))]
      )
    );
    let view = slots.slice(0, this.maxLimit);
    if (needPopover) {
      view = view.concat(ellipsisBtn);
    }
    return h("div", { class: "el-table-button" }, view);
  }
}
