import { CreateElement } from "vue/types/umd";
import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { t } from "../../src/locale";

@Component({
  name: "MorePopover",
})
export default class MorePopover extends Vue {
  @Prop({ type: Number, default: 3 }) limit!: number;
  @Prop({ type: String, default: t("morepopover.more") }) moreText!: string;
  @Prop({ type: String, default: "click" }) trigger!: string;
  @Prop({ type: String, default: "" }) popoverClass!: string;

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
          class: "el-more-popover__more-btn",
          directives: [
            {
              name: "popover",
              arg: "ElMorePopover",
            },
          ],
        },
        moreBtn ? moreBtn : [h("i", { class: "el-icon-more" }), this.moreText]
      ),
    ];
    let needPopover = slots.length > this.limit;
    let popoverClass = ["el-more-popover__popover", this.popoverClass];
    ellipsisBtn.push(
      h(
        "el-popover",
        {
          ref: "ElMorePopover",
          props: {
            trigger: this.trigger,
            popperClass: popoverClass.join(" "),
          },
        },
        [h("div", slots.slice(this.limit, slots.length))]
      )
    );
    let view = slots.slice(0, this.limit);
    if (needPopover) {
      view = view.concat(ellipsisBtn);
    }
    return h("div", { class: "el-more-popover" }, view);
  }
}
