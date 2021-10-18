<template>
	<el-form
		class="el-form-auto"
		ref="FormAuto"
		:model="model"
		:rules="rules"
		:validate-on-rule-change="false"
		:inline="inline"
		:label-width="labelWidth"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot name="prepend"></slot>
		<component
			v-if="fields"
			:is="inline ? 'span' : 'el-row'"
			class="el-form-auto-row"
			type="flex"
			:gutter="gutter"
		>
			<!--  @slot 表单内首部插槽-->
			<template v-for="(item, name) in fields">
				<component
					:is="inline ? 'span' : 'el-col'"
					:span="item.col || 24"
					v-if="!item.bindShow || item.bindShow(model)"
					:class="{'el-form-item_hidden':item.type=='hidden'}"
					:key="`col_${name}`"
				>
					<el-form-item :prop="name" :label-width="item.labelWidth" :key="`formItem_${name}`">
						<span slot="label" v-if="!labelHidden && !item.labelHidden">
							{{ item.label || "" }}
							<el-tooltip v-if="item.labelTooltip" :content="item.labelTooltip">
								<i class="el-icon-question"></i>
							</el-tooltip>
						</span>
						<template v-if="item.slot">
							<dynamic-slot :name="item.slot" :data="{ item, model, name }"></dynamic-slot>
						</template>
						<template v-else-if="'component'==item.type">
							<component :is="item.component" v-bind="item.props" v-on="item.on"></component>
						</template>
						<template v-else-if="'plain' == item.type">
							<div v-bind="item.props">{{ model[name] }}</div>
						</template>
						<template v-else-if="/text|password|textarea/g.test(item.type)">
							<el-input
								:name="name"
								v-model="model[name]"
								:type="item.type"
								v-bind="item.props"
								v-on="item.on"
							></el-input>
						</template>
						<template v-else-if="item.type=='hidden'">
							<el-input :name="name" v-model="model[name]" type="hidden" v-bind="item.props"></el-input>
						</template>
						<template v-else-if="item.type=='numberrange'">
							<el-number-range v-model="model[name]" v-bind="item.props" v-on="item.on"></el-number-range>
						</template>
						<template v-else-if="item.type == 'number'">
							<el-input-number
								v-model="model[name]"
								:readonly="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-input-number>
						</template>
						<template v-else-if="item.type == 'slider'">
							<el-slider
								v-model="model[name]"
								:disabled="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-slider>
						</template>
						<template v-else-if="item.type == 'switch'">
							<el-switch
								v-model="model[name]"
								:disabled="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-switch>
						</template>
						<template
							v-else-if="
                  /year|month|week|date|dates|datetime|daterange|monthrange|datetimerange/.test(item.type)
                "
						>
							<el-date-picker
								v-model="model[name]"
								:type="item.type"
								:readonly="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-date-picker>
						</template>
						<template v-else-if="/time|timerange/.test(item.type)">
							<el-time-picker
								:is-range="item.type == 'timerange'"
								v-model="model[name]"
								:readonly="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-time-picker>
						</template>
						<template v-else-if="/radio|radiobutton/.test(item.type)">
							<el-radio-group v-model="model[name]" v-bind="item.props" v-on="item.on">
								<component
									:is="item.type=='radio'?'el-radio':'el-radio-button'"
									v-for="(option, key) in item.options"
									:key="`${name}_${key}`"
									:label="`${option.value}`"
									:disabled="item.disabled || option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</component>
							</el-radio-group>
						</template>
						<template v-else-if="item.type == 'check'">
							<el-checkbox
								v-if="!item.notAll"
								:indeterminate="check[name] == 2"
								v-model="check[name]"
								style="margin-right: 30px"
								@change="checkAll(name)"
							>{{$t("formauto.checkAll")}}</el-checkbox>
							<el-checkbox-group
								v-model="model[name]"
								style="display: inline-block"
								@change="handleCheckedChange($event, name)"
								v-bind="item.props"
								v-on="item.on"
							>
								<el-checkbox
									v-for="(option, key) in item.options"
									:key="`${name}_${key}`"
									:label="`${option.value}`"
									:disabled="item.disabled || option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</el-checkbox>
							</el-checkbox-group>
						</template>
						<template v-else-if="item.type == 'select'">
							<el-select v-model="model[name]" v-bind="item.props" v-on="item.on">
								<el-option
									v-for="(option, key) in item.options"
									:key="`${name}_${key}`"
									:label="option.label"
									:value="`${option.value}`"
									:disabled="option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</el-option>
							</el-select>
						</template>
						<template v-else-if="item.type == 'cascader'">
							<el-cascader
								v-model="model[name]"
								:options="Array.isArray(item.options) ? item.options : []"
								v-bind="item.props"
								v-on="item.on"
							></el-cascader>
						</template>
						<template v-else-if="item.type == 'rate'">
							<el-rate
								v-model="model[name]"
								:style="{ marginTop: '8px' }"
								:disabled="item.disabled"
								show-score
								v-bind="item.props"
								v-on="item.on"
							></el-rate>
						</template>
					</el-form-item>
				</component>
			</template>
		</component>
		<slot name="append"></slot>
		<component :is="inline ? 'span' : 'div'" v-if="$slots">
			<el-form-item :label-width="inline ? '0px' : labelWidth">
				<!-- @slot 按钮插槽-->
				<slot></slot>
			</el-form-item>
		</component>
	</el-form>
</template>
<script lang="ts">
import {
	Vue,
	Component,
	Prop,
	Ref,
	Watch,
	Model,
} from "vue-property-decorator";
import { Form } from "element-ui";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import forEach from "lodash/forEach";
import omit from "lodash/omit";
import { ElFormAutoField } from "../../types/form-auto";
import { ElAutoMixinOptions, ElAutoOption } from "../../types/saas-extend"
import DynamicSlot from "../components/DynamicSlot"
import { transformOptions } from "../util"
import locale from "../../src/mixin/locale"
import { t } from "../../src/locale"

@Component({
	name: "ElFormAuto",
	provide() {
		return {
			slotRoot: this
		}
	},
	mixins: [locale],
	components: {
		DynamicSlot
	}
})
export default class ElFormAuto extends Vue {

	@Ref("FormAuto") readonly FormAuto!: Form;


	@Model("input", { type: Object }) readonly value!: Record<string, any>;

	/**
	 * 行内表单模式
	 * @default false
	 */
	@Prop({ type: Boolean, default: false }) readonly inline!: boolean;
	/**
	 * 表单域标签的宽度
	 */
	@Prop(String) readonly labelWidth!: string;
	/**
	 * 表单域标签是否隐藏
	 * @default false
	 */
	@Prop({ type: Boolean, default: false }) readonly labelHidden!: boolean;
	/**
	 * 表单项配置
	 * @type FormAutoFields
	 */
	@Prop(Object) readonly data!: Record<string, ElFormAutoField>;
	/**
	 * Row栅格下gutter数值
	 * @default 15
	 */
	@Prop({ type: Number, default: 15 }) readonly gutter!: number;

	private isRender: boolean = false;

	private fields: Record<string, ElFormAutoField> = {};
	private model: Record<string, any> = {};
	private check: Record<string, boolean | number> = {};
	private rules: Record<string, any> = {};

	@Watch("data", { immediate: true, deep: true })
	private onDataChange(data: Record<string, ElFormAutoField>) {
		data && (this.generateRule(), this.generateModel())
	}

	@Watch("value", { immediate: true, deep: true })
	private onValueChange(value: Record<string, any>) {
		value && this.setModel(value);
	}

	@Watch("model", { immediate: true, deep: true })
	private onModelChange() {
		this.$emit("input", this.getModel());
	}

	/**
	 * @public
	 * 重置表单
	 */
	public reset(): void {
		this.generateModel();
		for (let name in this.fields) {
			this.model[name] = this.fields.value;
		}
		if (this.FormAuto) {
			this.FormAuto.resetFields();
		}
		for (let key in this.check) {
			this.check[key] = false;
		}
	}

	/**
	 * @public
	 * 异步验证成功后获取表单所有参数
	 */
	public async validate(): Promise<boolean> {
		return await this.FormAuto.validate();
	}

	/**
	 * @public
	 * 获取表单所有参数
	 */
	public getModel(): Record<string, any> {
		let data: Record<string, any> = {},
			model = this.model;
		forEach(this.fields, (item: ElFormAutoField, name: string) => {
			if (!item.notSubmit) {
				if (item.rangeName && item.type && (/range$/g.test(item.type) || (item.type == "slider" && item.props?.range == true))) {
					let [sn, en] = item.rangeName;
					let [sd, ed] = model[name] || [null, null];
					data[sn] = sd;
					data[en] = ed;
					if (item.type == "daterange" && item.suffixTime == true) {
						data[sn] += "00:00:00";
						data[en] += "23:59:59";
					}
				} else {
					data[name] = model[name];
				}
			}
		});
		return data;
	}

	/**
	 * @public
	 * 设置表单对应参数，表单项不存在的将被无视
	 *
	 * @param {object} model 表单项对应值数据 例如：{key:value,...}
	 */
	public setModel(model: Record<string, any>): void {
		if (!this.isRender) return
		let _model = Object.assign({}, model);
		for (let name in _model) {
			if (Object.keys(_model).indexOf(name) > -1) {
				if (_model[name] === undefined) break;
				let value = _model[name];
				let field = this.fields[name];
				if (field && /radio|select|check/.test(field.type) && Array.isArray(field.options)) {
					// 远程获取选项框选项回显功能
					if (value && value.label && value.value) {
						if (field.options.findIndex((option: any) => option.value == value.value) == -1) {
							field.options.splice(0, 0, value)
						}
						value = value.value;
					}
					if ((field.type == "check" || (field.type == "select" && field.multiple)) && Array.isArray(value)) {
						for (let idx = 0; idx < value.length; idx++) {
							let val = value[idx];
							if (val.label && val.value) {
								if (field.options.findIndex((option: any) => option.value == val.value) == -1) {
									field.options.splice(0, 0, val)
								}
								value[idx] = val.value;
							} else {
								value[idx] = `${val}`
							}
						}
					} else {
						value = `${value}`;
					}
				}
				this.model[name] = value
			}
		}
	}

	/**
	 * 复选框 全选
	 */
	private checkAll(name: string): void {
		this.model[name] = [];
		if (this.check[name] === true) {
			let options = this.fields[name].options as Array<ElAutoOption>;
			if (Array.isArray(options)) {
				options.forEach((item) => {
					!item.disabled && this.model[name].push(`${item.value}`);
				});
			}
		}
	}

	/**
	 * 复选框组 change 事件
	 */
	private handleCheckedChange(value: string[], name: string): void {
		let checkedCount = value.length;
		let options = this.fields[name].options as Array<ElAutoOption>;
		let optionsCount = options.length;
		if (checkedCount > 0 && checkedCount < optionsCount) {
			this.check[name] = 2;
		} else {
			this.check[name] = checkedCount === optionsCount;
		}
	}

	private asyncOptions: ElFormAutoField[] = [] //统一处理options
	/**
	 * 规范生成 model 
	 */
	private generateModel(): void {
		this.fields = cloneDeep(this.data) as Record<string, ElFormAutoField>;
		forEach(this.fields, (item, name) => {
			item.on = Object.assign({}, item.on);
			item.props = omit(item, ["value", "addRules", "label", "labelHidden", "labelTooltip", "labelWidth", "type", "on", "slot", "bindShow", "rangeName", "suffixTime", "checkAll", "notSubmit", "required", "col", "options"])
			// item.props = Object.assign({}, item.props);
			item.type = item.type || "text"
			// 字段属性 slot 值为布尔值时，动态插槽 name 为字段名
			if (item.slot && typeof item.slot == "boolean") item.slot = name;
			// 根据字段 type 设置 model 默认值
			if (
				/(check|range|cascader)/g.test(item.type) ||
				(item.type == "select" && item.props.multiple === true) ||
				(item.type == "slider" && item.props.range === true)
			) {
				item.value = item.value || [];
				if (item.type == "timerange") {
					item.value = [new Date(1970, 1, 1, 0, 0), new Date(1970, 1, 1, 0, 0)];
				}
			} else if (/rate|number|slider|switch/.test(item.type)) {
				item.value = ~~item.value || 0;
			} else {
				item.value = item.value || "";
			}

			// 根据字段 type 设置表单占位字符串
			if (/range/g.test(item.type)) {
				if (item.type == "numberrange") {
					item.props.startPlaceholder = item.props.startPlaceholder || `${t("formauto.min")}${item.label}`;
					item.props.endPlaceholder = item.props.endPlaceholder || `${t("formauto.max")}${item.label}`;
				} else {
					item.props.startPlaceholder = item.props.startPlaceholder || `${t("formauto.start")}${item.label}`;
					item.props.endPlaceholder = item.props.endPlaceholder || `${t("formauto.end")}${item.label}`;
				}
			} if (/date|time|datetime|select|week|year|month|dates|cascader/g.test(item.type)) {
				item.props.placeholder = item.props.placeholder || `${t("formauto.pleaseSelect")}${item.label}`;
			} else {
				item.props.placeholder = item.props.placeholder || `${t("formauto.pleaseInput")}${item.label}`;
			}

			// 针对日期时间类型组件设置统一日期格式及显示格式
			if (/datetime/g.test(item.type)) {
				item.props.valueFormat = "yyyy-MM-dd HH:mm:ss";
				item.props.format = "yyyy-MM-dd HH:mm:ss";
			} else if (/date/g.test(item.type)) {
				item.props.valueFormat = "yyyy-MM-dd";
				item.props.format = "yyyy-MM-dd";
			} else if (/time/g.test(item.type)) {
				item.props.valueFormat = "HH:mm:ss";
			}

			if (
				this.$ELEMENT?.pickerOptions &&
				/date/g.test(item.type)
			) {
				let pickerOptions =
					this.$ELEMENT.pickerOptions[
					/range/g.test(item.type) ? "range" : "date"
					];
				if (pickerOptions) {
					item.props.pickerOptions = item.props.pickerOptions || pickerOptions;
				}
			}

			if (/text|password|textarea|select|cascader/.test(item.type)) {
				item.props.clearable = item.props.clearable == false ? false : true
			}

			if (/select|radio|check|cascader/.test(item.type)) {
				this.asyncOptions.push(item)
			}

			if (this.isRender == false) {
				this.$set(this.model, name, this.value[name] || item.value);
				if (item.type == "check" && item.checkAll !== false) {
					this.$set(this.check, name, false);
				}
			}
		})
		this.asyncOptionsRequest()
	}

	private generateRule(): void {
		this.isRender = false;
		this.rules = {};
		forEach(this.data, (item, name) => {
			this.rules[name] = [];

			if (item.required === true) {
				let requiredRule: any = {
					required: true,
					message: `${item.label} 不可为空`,
					trigger: "change",
				};
				switch (item.type) {
					case "check":
					case "daterange":
					case "timerange":
					case "datetimerange":
					case "cascader":
						requiredRule.type = "array";
						break;
					case "select":
						requiredRule.type = item.multiple ? "array" : "string";
						break;
					case "rate":
						requiredRule.type = "number";
						break;
				}
				this.rules[name].push(requiredRule);
			}
			if (item.addRules && item.addRules.length > 0) {
				this.rules[name].push(...item.addRules);
			}
		});
	}

	private asyncOptionsRequest(): void {
		if (this.asyncOptions.length) {
			Promise.all(this.asyncOptions.map((item) => {
				return new Promise((resolve, reject) => {
					if (item.remote && item.type == "select" && item.options instanceof Function) {
						let remoteMethod = item.options;
						item.props.filterable = true;
						item.props.remote = true;
						item.props.remoteMethod = debounce((query?: string) => {
							item.options = []
							item.props && (item.props.loading = true);
							remoteMethod(query).then((options: ElAutoMixinOptions) => {
								return transformOptions(options)
							}).then((options: any) => {
								item.options = options;
								resolve(true);
							});
							item.props && (item.props.loading = false);
						}, 500);
						item.props.remoteMethod("")
					} else if (item.options) {
						transformOptions(item.options).then((options) => {
							item.options = options
							resolve(true);
						})
					}
				})
			})).finally(() => {
				this.canRender()
			})
		} else {
			this.canRender()
		}
	}

	private canRender() {
		this.isRender = true;
		this.$nextTick(function () {
			this.setModel(this.value)
		})
	}
}
</script>