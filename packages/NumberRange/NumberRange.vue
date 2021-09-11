<template>
	<div
		class="el-number-range el-range-editor el-input__inner"
		:class="[
      inputSize ? `el-range-editor--${ inputSize }` : '',
      isActive ? 'is-active' : ''
    ]"
		@mouseenter="handleMouseEnter"
		@mouseleave="showClose = false"
	>
		<input
			ref="reference"
			autocomplete="off"
			:placeholder="startPlaceholder"
			v-model="minValue"
			:readonly="inputDisabled"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleInputChange(0)"
			class="el-range-input"
		/>
		<slot name="range-separator">
			<span class="el-range-separator">{{ rangeSeparator }}</span>
		</slot>
		<input
			autocomplete="off"
			:placeholder="endPlaceholder"
			v-model="maxValue"
			:readonly="inputDisabled"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleInputChange(1)"
			class="el-range-input"
		/>
		<i
			@click="handleClickClear()"
			:class="[showClose ? '' + clearIcon : '']"
			class="el-input__icon el-range__close-icon"
		></i>
	</div>
</template>
<script lang="ts">
//@ts-ignore
import Emitter from 'element-ui/src/mixins/emitter.js';
import { Form, FormItem } from "element-ui";
import { isNumber } from "lodash"
import { Vue, Component, Model, Prop, Inject, Watch, Emit, Ref } from "vue-property-decorator"
@Component({
	name: "ElNumberRange",
	mixins: [Emitter]
})
export default class ElNumberRange extends Vue {
	@Ref("reference") reference!: HTMLInputElement

	// 继承 el-form组件 相关关联
	@Inject({ from: "elForm", default: {} }) elForm!: Form
	@Inject({ from: "elFormItem", default: {} }) elFormItem!: FormItem

	@Model("input", { type: Array, default: () => [] }) readonly value!: number[]

	private minValue: string = "";
	private maxValue: string = "";

	@Watch("value", { immediate: true })
	private handleValueChange(value: number[]) {
		this.minValue = value[0] !== undefined ? `${value[0]}` : ""
		this.maxValue = value[1] !== undefined ? `${value[1]}` : ""
		if (this.validateEvent) {
			this.dispatch('ElFormItem', 'el.form.change', value);
			this.$emit("change", value)
		}
	}

	@Prop(Number) min!: number
	@Prop(Number) max!: number

	@Emit("input")
	private handleInputChange(type: number) {
		if (!isNumber(this.minValue) || !isNumber(this.maxValue)) {
			this.minValue = this.minValue.replace(/[^0-9-.]/g, "");
			this.maxValue = this.maxValue.replace(/[^0-9-.]/g, "");
		}
		if (this.min) {
			this.minValue = parseFloat(this.minValue) < this.min ? `${this.min}` : this.minValue
			this.maxValue = parseFloat(this.maxValue) < this.min ? `${this.min}` : this.maxValue
		}
		if (this.max) {
			this.minValue = parseFloat(this.minValue) > this.max ? `${this.max}` : this.minValue
			this.maxValue = parseFloat(this.maxValue) > this.max ? `${this.max}` : this.maxValue
		}
		if (this.minValue && this.maxValue) {
			if (type == 0) {
				this.minValue = parseFloat(this.minValue) <= parseFloat(this.maxValue) ? this.minValue : this.maxValue;
			} else {
				this.maxValue = parseFloat(this.maxValue) >= parseFloat(this.minValue) ? this.maxValue : this.minValue;
			}
		}
		this.handleMouseEnter();
		return [this.minValue, this.maxValue]
	}

	private mounted() {
		this.$on('fieldReset', this.handleClickClear);
	}

	@Prop({ type: String, default: "最小值" }) startPlaceholder!: string
	@Prop({ type: String, default: "最大值" }) endPlaceholder!: string
	@Prop({ type: String, default: "-" }) rangeSeparator!: string

	@Prop(Boolean) disabled!: boolean;
	get inputDisabled(): boolean {
		return this.disabled || (this.elForm || {}).disabled;
	}

	@Prop({
		type: String, validator: function (value: string) {
			return /medium|mini|small/.test(value)
		}
	}) size!: "medium" | "mini" | "small"


	get _elFormItemSize(): string | undefined {
		//@ts-ignore
		return (this.elFormItem || {}).elFormItemSize;
	}

	get inputSize(): "medium" | "mini" | "small" | undefined {
		return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
	}

	@Prop({ type: Boolean, default: true }) validateEvent!: boolean;

	private isActive: boolean = false;

	public focus(): void {
		if (this.reference) {
			this.reference.focus()
		}
	}

	private handleFocus() {
		this.isActive = true;
		this.$emit("focus")
	}

	private handleBlur() {
		this.isActive = false;
		if (this.validateEvent) {
			this.dispatch('ElFormItem', 'el.form.blur');
			this.$emit("blur")
		}
	}

	@Prop({ type: Boolean, default: true }) clearable!: string
	@Prop({ type: String, default: "el-icon-circle-close" }) clearIcon!: string

	private showClose: boolean = false;

	get valueIsEmpty(): boolean {
		return !(this.minValue || this.maxValue);
	}

	private handleMouseEnter() {
		if (this.inputDisabled) return;
		if (!this.valueIsEmpty && this.clearable) {
			this.showClose = true;
		}
	}

	private handleClickClear() {
		if (this.inputDisabled || this.valueIsEmpty) return;
		this.showClose = false;
		this.minValue = ""
		this.maxValue = ""
		this.$emit("input", null)
	}
}
</script>