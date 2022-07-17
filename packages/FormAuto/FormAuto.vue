<template>
	<el-form
		class="el-form-auto"
		ref="FormAuto"
		:model="model"
		:rules="rules"
		:validate-on-rule-change="false"
		:inline="inline"
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
					<el-form-item :prop="name" :label-width="item.labelWidth" :data-prop="name">
						<span slot="label" v-if="!labelHidden && !item.labelHidden">
							{{ item.label || "" }}
							<el-tooltip v-if="item.labelTooltip" :content="item.labelTooltip">
								<i class="el-icon-question"></i>
							</el-tooltip>
						</span>
						<template v-if="item.slot">
							<slot :name="item.slot" v-bind:item="item" v-bind:model="model" v-bind:name="name"></slot>
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
									:label="option.value"
									:disabled="item.disabled || option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</component>
							</el-radio-group>
						</template>
						<template v-else-if="item.type == 'check' && Array.isArray(item.options)">
							<el-checkbox
								v-if="!item.notAll"
								:indeterminate="check[name] == 2"
								v-model="check[name]"
								@change="checkAll(name)"
							>{{$t("formauto.checkAll")}}</el-checkbox>
							<el-checkbox-group
								v-model="model[name]"
								style="display: inline"
								@change="handleCheckedChange(name,$event)"
								v-bind="item.props"
								v-on="item.on"
							>
								<el-checkbox
									v-for="(option, key) in item.options"
									:key="`${name}_${key}`"
									:label="option.value"
									:disabled="item.disabled || option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</el-checkbox>
							</el-checkbox-group>
						</template>
						<template v-else-if="item.type == 'select' && Array.isArray(item.options)">
							<el-select
								v-model="model[name]"
								v-select-scroll="item.loadScroll && item.props?item.props.remoteMethod:null"
								v-bind="item.props"
								v-on="item.on"
							>
								<el-option
									v-for="(option,key) in selectOptions(item,name)"
									:key="`${name}_${key}`"
									:label="option.label"
									:value="option.value"
									:disabled="option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</el-option>
								<el-option
									disabled
									v-if="item.remoteParams && item.remoteParams.optionLoading"
									value="el-formauto-option-loading"
									:label="$t('formauto.selectLoading')"
								>{{$t('formauto.selectLoading')}}</el-option>
							</el-select>
						</template>
						<template v-else-if="item.type == 'cascader' && Array.isArray(item.options)">
							<el-cascader
								v-model="model[name]"
								:options="item.options"
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
			<el-form-item>
				<!-- @slot 按钮插槽-->
				<slot></slot>
			</el-form-item>
		</component>
	</el-form>
</template>
<script lang="ts">
import { Vue, Component, Prop, Ref, Watch, Model } from "vue-property-decorator";
import { Form } from "element-ui";
import { forEach, cloneDeep, uniqBy, omit } from "lodash-es";
import { ElAutoMixinOptions, ElAutoOption, ElFormAutoField } from "../../types/saas-extend"
import { transformOptions } from "../util"
import locale from "../../src/mixin/locale"
import selectScroll from "../../src/mixin/selectScroll"
import { ValidateCallback } from "element-ui/types/form";
import { formatDate } from "element-ui/src/utils/date-util.js"

@Component({
	name: "ElFormAuto",
	mixins: [locale, selectScroll],
})
export default class ElFormAuto extends Vue {

	@Ref("FormAuto") readonly FormAuto!: Form;
	/**
	 * 行内表单模式
	 * @default false
	 */
	@Prop({ type: Boolean, default: false }) readonly inline!: boolean;
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

	private fields: Record<string, ElFormAutoField> = {};
	private rules: Record<string, any> = {};

	@Watch("data", { immediate: true, deep: true })
	private onDataChange(data: Record<string, ElFormAutoField>) {
		data && (this.generateRule(), this.generateModel())
	}

	@Model("input", { type: Object, default: () => { return {} } }) model!: Record<string, any>;

	@Watch("model", { immediate: true, deep: true })
	private onModelChange() {
		this.$emit("input", this.getModel());
	}

	private defaultValue: Record<string, any> = {};
	private generateModel(): void {
		this.fields = cloneDeep(this.data) as Record<string, ElFormAutoField>;
		forEach(this.fields, (item, name) => {
			item.name = name;
			item.on = Object.assign({}, item.on);
			item.props = omit(item, ["value", "addRules", "label", "labelHidden", "labelTooltip", "labelWidth", "type", "on", "slot", "bindShow", "rangeName", "suffixTime", "valueFormat", "checkAll", "notSubmit", "required", "col", "options"])
			item.type = item.type || "text"
			// 字段属性 slot 值为布尔值时，动态插槽 name 为字段名
			if (item.slot) {
				item.slot = typeof item.slot == "boolean" ? name : item.slot;
				item.type = "text"
			}
			// 根据字段 type 设置 model 默认值
			if (
				/(check|range|cascader)/g.test(item.type) ||
				(item.type == "select" && item.props.multiple === true) ||
				(item.type == "slider" && item.props.range === true)
			) {
				item.value = item.value || [];
			} else if (item.type == "timerange") {
				let defaultValue = ["00:00:00", "00:00:00"]
				item.value = item.value || defaultValue;
			} else if (item.type == "datetimerange") {
				item.props.defaultTime = item.props.defaultTime || ["00:00:00", "23:59:59"]
			} else if (/rate|number|slider/.test(item.type)) {
				item.value = parseInt(item.value) || 0;
			} else if (item.type == "switch") {
				item.value = item.value === undefined ? false : item.value;
			} else {
				item.value = item.value === undefined ? "" : item.value;
			}

			// 根据字段 type 设置表单占位字符串
			if (/range/g.test(item.type)) {
				if (item.type == "numberrange") {
					item.props.startPlaceholder = item.props.startPlaceholder || `${this.$t("formauto.min")}${item.label}`;
					item.props.endPlaceholder = item.props.endPlaceholder || `${this.$t("formauto.max")}${item.label}`;
				} else {
					item.props.startPlaceholder = item.props.startPlaceholder || `${this.$t("formauto.start")}${item.label}`;
					item.props.endPlaceholder = item.props.endPlaceholder || `${this.$t("formauto.end")}${item.label}`;
				}
			} if (/date|time|datetime|select|week|year|month|dates|cascader/g.test(item.type)) {
				item.props.placeholder = item.props.placeholder || `${this.$t("formauto.pleaseSelect")}${item.label}`;
			} else {
				item.props.placeholder = item.props.placeholder || `${this.$t("formauto.pleaseInput")}${item.label}`;
			}

			// 针对日期时间类型组件设置统一日期格式及显示格式
			if (/datetime/g.test(item.type)) {
				item.props.valueFormat = "yyyy/MM/dd HH:mm:ss";
				item.props.format = item.props.format || "yyyy-MM-dd HH:mm:ss";
			} else if (/date/g.test(item.type)) {
				item.props.valueFormat = "yyyy/MM/dd";
				item.props.format = item.props.format || "yyyy-MM-dd";
			} else if (/time/g.test(item.type)) {
				item.props.valueFormat = item.props.valueFormat || "HH:mm:ss";
			}

			if (this.$ELEMENT && this.$ELEMENT.pickerOptions && /date/g.test(item.type)) {
				let type = /range/g.test(item.type) ? "range" : "date"
				let pickerOptions = this.$ELEMENT.pickerOptions[type];
				if (pickerOptions) {
					item.props.pickerOptions = Object.assign({}, pickerOptions, item.props.pickerOptions);
				}
			}

			if (/text|password|textarea|select|cascader/.test(item.type)) {
				item.props.clearable = item.props.clearable == false ? false : true
			}

			if (/select|radio|check|cascader/.test(item.type)) {
				this.asyncOptions.push(item)
				if (item.type == "check" && item.checkAll !== false) {
					this.$set(this.check, name, false);
				}
			}
			this.defaultValue[name] = item.value;
			this.$set(this.model, name, this.model[name] === undefined ? item.value : this.model[name]);
		})
		this.getModel();
		this.$nextTick(function () {
			this.FormAuto.clearValidate()
		})
		this.asyncOptionsRequest()
	}

	/**
	 * @public
	 * 获取表单所有参数
	 */
	public getModel(): Record<string, any> {
		let model = this.model
		for (let name in this.fields) {
			let field = this.fields[name]
			if (field) {
				if (Array.isArray(model[name]) && model[name].length == 2 && field.rangeName && field.type && (/range$/g.test(field.type) || (field.type == "slider" && field.props && field.props.range == true))) {
					let [sn, en] = field.rangeName;
					let [sd, ed] = model[name];
					if (sd && ed && /date|time/g.test(field.type)) {
						if (field.type == "daterange" && field.suffixTime == true) {
							sd += " 00:00:00";
							ed += " 23:59:59";
						}
						if (field.valueFormat) {
							if (field.valueFormat == 'timestamp') {
								sd = new Date(sd).valueOf();
								ed = new Date(ed).valueOf();
							} else if (field.valueFormat == 'unix') {
								sd = Math.floor(new Date(sd).valueOf() / 1000);
								ed = Math.floor(new Date(ed).valueOf() / 1000);
							} else {
								sd = formatDate(sd, field.valueFormat);
								ed = formatDate(ed, field.valueFormat);
							}
						}
					}
					this.$set(this.model, sn, sd)
					this.$set(this.model, en, ed)
				} else if (field.type == "select" && field.remote) {
					let value = this.selectEcho(name, model[name]);
					if (value) {
						model[name] = value;
					}
				} else if (field.type == "check") {
					this.handleCheckedChange(name, model[name]);
				} else if (model[name] === undefined && this.defaultValue[name] !== undefined) {
					model[name] = this.defaultValue[name]
				}
			}
		}
		return this.model
	}

	/**
	 * @public
	 * 设置表单对应参数，表单项不存在的将被无视
	 *
	 * @param {object} model 表单项对应值数据 例如：{key:value,...}
	 */
	public setModel(model: Record<string, any>): void {
		for (let name in model) {
			this.$set(this.model, name, model[name] || this.defaultValue[name])
		}
	}

	/**
	 * 更新options
	 */
	public refreshOptions(fieldName: string) {
		let field = this.fields[fieldName];
		if (field && field.props.remoteMethod) {
			field.remoteParams.query = "refresh";
			this.echoOptions[fieldName] = {};
			field.remoteMethod();
		}
	}

	private echoOptions: Record<string, any> = {}

	private selectEcho(name: string, options: any): any {
		if (!this.echoOptions[name]) {
			this.echoOptions[name] = []
		}
		if (Array.isArray(options) && options.length > 0) {
			let echoOptions = this.echoOptions[name];
			let values: Array<string | number> = []
			let isChange = false;
			for (let i = 0; i < options.length; i++) {
				if (options[i] && options[i].label && options[i].value) {
					if (!echoOptions.find((option: Record<string, string>) => option.value == options[i].value)) {
						echoOptions.push(Object.assign({}, options[i]))
					}
					isChange = true;
					values.push(options[i].value);
				} else {
					values.push(options[i]);
				}
			}
			return isChange ? values : false
		} else if (options && options.label && options.value) {
			this.echoOptions[name] = [Object.assign({}, options)];
			return options.value;
		} else {
			return false;
		}
	}

	private selectOptions(field: ElFormAutoField, name: string) {
		if (Array.isArray(field.options) && field.remote && this.echoOptions[name]) {
			let echoOpitons = this.echoOptions[name] || []
			return uniqBy(echoOpitons.concat(field.options), "value")
		}
		return field.options
	}

	/**
	 * @public
	 * 重置表单
	 */
	public reset(): void {
		this.generateModel();
		for (let name in this.fields) {
			let field = this.fields[name];
			this.model[name] = this.defaultValue[name];
			if (field.type == "check" && field.checkAll) {
				this.check[name] = false;
			}
		}
		this.echoOptions = {}
		if (this.FormAuto) {
			this.$nextTick(function () {
				this.FormAuto.resetFields();
			})
		}
	}

	/**
	 * @public
	 * 异步验证成功后获取表单所有参数
	 */
	public validate(cb?: ValidateCallback): Promise<boolean> | void {
		return cb ? this.FormAuto.validate(cb) : this.FormAuto.validate();
	}

	/**
	 * @public
	 * 验证单个字段
	 */
	public validateField(props: string[] | string, callback: (errorMessage: string) => void): void {
		return this.FormAuto && this.FormAuto.validateField(props, callback);
	}

	// #region 复选框全选相关处理
	private check: Record<string, boolean | number> = {};
	/**
	 * 复选框 全选
	 */
	private checkAll(name: string): void {
		this.model[name] = [];
		if (this.check[name] === true) {
			let options = this.fields[name].options as Array<ElAutoOption>;
			if (Array.isArray(options)) {
				options.forEach((item: Record<string, any>) => {
					!item.disabled && this.model[name].push(item.value);
				});
			}
		}
	}

	/**
	 * 复选框组 change 事件
	 */
	private handleCheckedChange(name: string, value: string[]): void {
		if (this.check[name] == undefined || !value) return
		let checkedCount = value.length || 0;
		let options = this.fields[name].options as ElAutoOption[];
		let optionsCount = options.length;
		if (checkedCount > 0 && checkedCount < optionsCount) {
			this.check[name] = 2;
		} else {
			this.check[name] = checkedCount === optionsCount;
		}
	}
	// #endregion


	private generateRule(): void {
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
						requiredRule.type = "array";
						break;
					case "cascader":
						if (item.props && item.props.emitPath == true) {
							requiredRule.type = "array";
						}
						break;
					case "slider":
						requiredRule.type =  item.props && item.props.range == true? "array" : "number";
						break;
					case "select":
						if (item.multiple) {
							requiredRule.type = "array";
						} else {
							requiredRule.type = "string";
							requiredRule.transform = function (v) { return `${v}` }
						}
						break;
					case "radio":
					case "radiobutton":
						requiredRule.type = "string";
						requiredRule.transform = function (v) { return `${v}` }
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

	private asyncOptions: ElFormAutoField[] = [] //统一处理options
	private asyncOptionsRequest(): void {
		if (this.asyncOptions.length) {
			this.asyncOptions.forEach((item) => {
				if (item.remote && item.type == "select" && item.options instanceof Function) {
					let remoteMethod = item.options;
					item.props.filterable = true;
					item.props.remote = true;
					item.remoteParams = {
						query: "",
						page: 1,
						loadFinish: false,
						optionLoading: false,
					};
					item.remoteMethod = (query: string = "") => {
						if (item.remoteParams.query != query) {
							item.remoteParams.query = query;
							item.remoteParams.page = 1;
							item.remoteParams.loadFinish = false;
						}
						if (item.remoteParams.page == 1) {
							item.options = []
						}
						if (item.remoteParams.loadFinish) return
						item.remoteParams.optionLoading = true;
						remoteMethod(item.remoteParams.query || "", item.remoteParams.page).then((options: ElAutoMixinOptions) => {
							return transformOptions(options)
						}).then((options: ElAutoOption[]) => {
							item.remoteParams.optionLoading = false;
							if (options.length == 0 && item.remoteParams.page > 1) {
								item.remoteParams.loadFinish = true;
								return;
							}
							options = (item.options as ElAutoOption[]).concat(options)
							item.options = options;
							item.remoteParams.page = item.remoteParams.page + 1;
						}).catch(() => {
							item.remoteParams.optionLoading = false;
						});
					};
					item.props.remoteMethod = item.remoteMethod;
					item.props.remoteMethod("");
					if (!item.on) {
						item.on = {}
					}
					let originVisibleChangeEvent = item.on["visible-change"] || (() => { })
					item.on["visible-change"] = function (visible) {
						originVisibleChangeEvent(visible)
						if (visible == false && item.options && item.options.length == 0) {
							item.props.remoteMethod.call(item, "")
						}
					}
					let originClearEvent = item.on.clear || (() => { })
					let self = this;
					item.on.clear = function () {
						originClearEvent()
						item.remoteParams.query = "clear";
						self.echoOptions[item.name] = [];
						item.props.remoteMethod.call(item, "")
					}
				} else if (item.options) {
					let remoteMethod = item.options;
					item.remoteMethod = () => {
						transformOptions(remoteMethod, item.type != 'cascader').then((options) => {
							item.options = options
							this.handleCheckedChange(item.name, this.model[item.name])
						})
					}
					item.remoteMethod()
				}
			})
		}
	}
}
</script>