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
			<template v-for="(item, name, index) in fields">
				<component
					:is="inline ? 'span' : 'el-col'"
					:span="item.col || 24"
					v-if="(!item.bindShow || item.bindShow(model)) && item.type!='hidden' && (!overCollapse || index < overCollapse)"
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
						<template v-else-if="item.type=='numberrange'">
							<el-number-range v-model="model[name]" v-bind="item.props" v-on="item.on"></el-number-range>
						</template>
						<template v-else-if="item.type == 'number'">
							<el-input-number
								v-model="model[name]"
								:readonly="item.props.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-input-number>
						</template>
						<template v-else-if="item.type == 'slider'">
							<el-slider v-model="model[name]" v-bind="item.props" v-on="item.on"></el-slider>
						</template>
						<template v-else-if="item.type == 'switch'">
							<el-switch v-model="model[name]" v-bind="item.props" v-on="item.on"></el-switch>
						</template>
						<template v-else-if="/(year(|s)|month(|s)|week|date(s|time|))(range|)/.test(item.type)">
							<el-date-picker v-model="model[name]" :type="item.type" v-bind="item.props" v-on="item.on"></el-date-picker>
						</template>
						<template v-else-if="/time(select|range|)/.test(item.type)">
							<el-time-select
								v-if="item.type == 'timeselect'"
								v-model="model[name]"
								v-bind="item.props"
								v-on="item.on"
							></el-time-select>
							<el-time-picker
								v-else
								:is-range="item.type == 'timerange'"
								v-model="model[name]"
								v-bind="item.props"
								v-on="item.on"
							></el-time-picker>
						</template>
						<template v-else-if="/radio(|button)/.test(item.type)">
							<el-radio-group v-model="model[name]" v-bind="item.props" v-on="item.on">
								<component
									:is="item.type=='radio'?'el-radio':'el-radio-button'"
									v-if="item.allOption"
									label
								>{{$t('formauto.selectAll')}}</component>
								<component
									:is="item.type=='radio'?'el-radio':'el-radio-button'"
									v-for="(option, key) in item.options"
									:key="`${name}_${key}`"
									:label="option.value"
									:disabled="option.disabled"
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
								@change="checkAll(name)"
							>{{$t("formauto.checkAll")}}</el-checkbox>
							<el-checkbox-group
								v-model="model[name]"
								style="display: inline"
								@change="handleCheckedChange(name,$event)"
								v-bind="item.props"
								v-on="item.on"
							>
								<template v-if="Array.isArray(item.options)">
									<el-checkbox
										v-for="(option, key) in item.options"
										:key="`${name}_${key}`"
										:label="option.value"
										:disabled="option.disabled"
									>
										<i v-if="option.icon" :class="option.icon"></i>
										<span>{{ option.label }}</span>
									</el-checkbox>
								</template>
							</el-checkbox-group>
						</template>
						<template v-else-if="item.type == 'select'">
							<el-select
								v-model="model[name]"
								v-select-scroll="item.loadScroll && item.props?item.props.remoteMethod:null"
								v-bind="item.props"
								v-on="item.on"
							>
								<el-option
									v-if="!item.props.multiple && item.allOption"
									value
									:label="$t('formauto.selectAll')"
								></el-option>
								<template v-if="Array.isArray(item.options)">
									<el-option
										v-for="(option,key) in selectOptions(name)"
										:key="`${name}_${key}`"
										:label="option.label"
										:value="option.value"
										:disabled="option.disabled"
									>
										<i v-if="option.icon" :class="option.icon"></i>
										<span>{{ option.label }}</span>
									</el-option>
								</template>
								<el-option
									disabled
									v-if="item.remoteParams && item.remoteParams.optionLoading"
									value="el-formauto-option-loading"
									:label="$t('formauto.selectLoading')"
								>{{$t('formauto.selectLoading')}}</el-option>
							</el-select>
						</template>
						<template v-else-if="item.type == 'cascader'">
							<el-cascader
								v-model="model[name]"
								:options="Array.isArray(item.options)?item.options:[]"
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
import { forEach, cloneDeep, uniqBy, omit, keyBy } from "lodash-es";
import { ElAutoMixinOptions, ElAutoOption, ElFormAutoField } from "../../types/saas-extend"
import { transformOptions } from "../../src/util"
import locale from "../../src/mixin/locale"
import selectScroll from "../../src/mixin/selectScroll"
import { ValidateCallback } from "element-ui/types/form";
import { toDate } from "element-ui/src/utils/date-util.js"

const DATE_UNIX = function (value, format) {
	if (typeof value == 'number' && `${value}`.length == 10) {
		value = Math.floor(value * 1000)
	}
	value = toDate(value);
	if (!value) return '';
	if (format === 'timestamp') return value.getTime();
	else if (format === 'unix') return Math.floor(value.getTime() / 1000);
};

@Component({
	name: "ElFormAuto",
	mixins: [locale, selectScroll],
})
export default class ElFormAuto extends Vue {
	@Ref("FormAuto") readonly FormAuto!: Form;
	@Prop({ type: Boolean, default: false }) readonly inline!: boolean;
	@Prop({ type: Boolean, default: false }) readonly labelHidden!: boolean;
	@Prop({ type: [Number, Boolean], default: false }) readonly overCollapse!: boolean | number;
	@Prop(Object) readonly data!: Record<string, ElFormAutoField>;
	@Prop({ type: Number, default: 15 }) readonly gutter!: number;

	@Watch("data", { immediate: true, deep: true })
	private onDataChange(data: Record<string, ElFormAutoField>) {
		data && (this.generateModel(), this.generateRule())
	}

	@Model("input", { type: Object, default: () => { return {} } }) value!: Record<string, any>;
	@Watch("value", { deep: true })
	private onValueChange(value: Record<string, any>, oldValue: Record<string, any>) {
		this.setModel(value)
	}

	private model: Record<string, any> = {};
	@Watch("model", { immediate: true, deep: true })
	private onModelChange() {
		this.$emit("input", this.getModel())
	}

	private asyncOptions: ElFormAutoField[] = [] //统一处理options
	private fields: Record<string, ElFormAutoField> = {};
	private defaultValue: Record<string, any> = {};
	private rules: Record<string, any> = {};
	private generateModel(): void {
		// this.fields = cloneDeep(this.data) as Record<string, ElFormAutoField>;
		forEach(this.data, (item, name) => {
			let field: ElFormAutoField;
			if (!this.fields[name]) {
				field = cloneDeep(item);
			} else {
				field = this.fields[name];
			}
			field.name = name;
			let notProps = ["value", "addRules", "label", "labelHidden", "allOption", "labelTooltip", "labelWidth", "type", "on", "slot", "bindShow", "rangeName", "suffixTime", "valueFormat", "notAll", "required", "col", "options"];
			notProps.forEach((key: string) => {
				if (item[key] !== undefined && !/on|options/.test(key)) {
					field[key] = item[key];
				}
			})
			field.on = Object.assign(field.on || {}, item.on)
			field.props = Object.assign(field.props || {}, omit(item, notProps))
			// field.type = item.type || "text"
			// 字段属性 slot 值为布尔值时，动态插槽 name 为字段名
			if (item.slot) {
				field.slot = typeof item.slot == "boolean" ? name : item.slot;
			}
			// 根据字段 type 设置 model 默认值
			if (
				/(check|numberrange|cascader)/g.test(item.type) ||
				(item.type == "select" && field.props.multiple === true)
			) {
				this.defaultValue[name] = []
				field.value = item.value || [];
			} else if (item.type == "slider" && field.props.range === true) {
				let min = field.props.min || 0
				let max = field.props.max || 100
				this.defaultValue[name] = [min, max]
				field.value = item.value || [min, max];
			} else if (/rate|number|slider/.test(item.type)) {
				this.defaultValue[name] = 0
				field.value = parseInt(item.value) || 0;
			} else if (item.type == "switch") {
				this.defaultValue[name] = false
				field.value = item.value === undefined ? false : item.value;
			} else if (/(date(s|time|)|time(?!select)|month(|s)|year|(|s)|week)(range|)/.test(item.type)) {
				// 针对日期时间类型组件设置统一日期格式及显示格式
				field.props.valueFormat = field.valueFormat == "unix" ? "timestamp" : field.valueFormat;
				if (/datetime/g.test(item.type)) {
					field.props.valueFormat = field.props.valueFormat || "yyyy-MM-dd HH:mm:ss";
					if (item.type == "datetimerange") {
						field.props.defaultTime = field.props.defaultTime || ["00:00:00", "23:59:59"]
					}
				} else if (/date|week/g.test(field.type)) {
					if (item.type == "daterange" && item.suffixTime) {
						field.props.valueFormat = field.props.valueFormat || "yyyy-MM-dd HH:mm:ss"
						field.props.defaultTime = ["00:00:00", "23:59:59"]
					} else {
						field.props.valueFormat = field.props.valueFormat || "yyyy-MM-dd"
					}
				} else if (/time/g.test(item.type)) {
					field.props.valueFormat = field.props.valueFormat || "HH:mm:ss";
				} else if (/month/g.test(item.type)) {
					field.props.valueFormat = field.props.valueFormat || "yyyy-MM";
				} else if (/year/g.test(item.type)) {
					field.props.valueFormat = field.props.valueFormat || "yyyy";
				}
				if (/range|dates|years|months/.test(item.type)) {
					this.defaultValue[name] = null
				} else {
					this.defaultValue[name] = ""
				}
				field.value = item.value || this.defaultValue[name];
			} else {
				this.defaultValue[name] = ""
				field.value = item.value === undefined ? "" : item.value;
			}

			// 根据字段 type 设置表单占位字符串
			if (/range/g.test(item.type)) {
				if (item.type == "numberrange") {
					field.props.startPlaceholder = item.startPlaceholder || `${this.$t("formauto.min")}${item.label}`;
					field.props.endPlaceholder = item.endPlaceholder || `${this.$t("formauto.max")}${item.label}`;
				} else {
					field.props.startPlaceholder = item.startPlaceholder || `${this.$t("formauto.start")}${item.label}`;
					field.props.endPlaceholder = item.endPlaceholder || `${this.$t("formauto.end")}${item.label}`;
				}
			} if (/date(|time|s)|time|select|week|year|month|cascader/g.test(item.type)) {
				field.props.placeholder = item.placeholder || `${this.$t("formauto.pleaseSelect")}${item.label}`;
			} else {
				field.props.placeholder = item.placeholder || `${this.$t("formauto.pleaseInput")}${item.label}`;
			}


			if (this.$ELEMENT && this.$ELEMENT.pickerOptions && /date(?!s)/g.test(item.type)) {
				let type = /range/g.test(item.type) ? "range" : "date"
				let pickerOptions = this.$ELEMENT.pickerOptions[type];
				if (pickerOptions) {
					field.props.pickerOptions = Object.assign({}, pickerOptions, field.props.pickerOptions);
				}
			}

			if (/text|password|textarea|select|cascader/.test(item.type)) {
				field.props.clearable = field.props.clearable == false ? false : true
			}

			if (/select|radio|check|cascader/.test(item.type) && item.type != "timeselect") {
				if (item.options instanceof Function) {
					if (item.options != field.originOption) {
						field.options = item.options
						this.asyncOptions.push(field)
						field.originOption = item.options
					}
				} else {
					field.options = item.options
					this.asyncOptions.push(field)
				}
				if (item.type == "check" && item.notAll !== false) {
					this.$set(this.check, name, false);
				}
			}
			if (field.type == "select" && field.remote) {
				let originVisibleChangeEvent = field.on["visible-change"] || (() => { })
				let originClearEvent = field.on.clear || (() => { })
				let self = this;
				field.on["visible-change"] = function (visible) {
					originVisibleChangeEvent(visible)
					if (visible == false && field.options && field.options.length == 0) {
						field.props.remoteMethod.call(item, "")
					}
				}
				field.on.clear = function () {
					originClearEvent()
					self.refreshOptions(name)
				}
			}
			let value = field.value
			if (this.model[name] !== undefined) {
				value = this.model[name];
			} else if (this.value[name] !== undefined) {
				value = this.value[name]
			}
			this.$set(this.model, name, value);
			this.fields[name] = field;
		})
		this.asyncOptionsRequest()
	}

	private asyncOptionsRequest(): void {
		if (this.asyncOptions.length) {
			let asyncList: Promise<void>[] = this.asyncOptions.map((item) => {
				return new Promise((resolve) => {
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
						item.remoteMethod = (query: string) => {
							if (item.remoteParams.query != query && query !== undefined) {
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
						resolve();
					} else if (item.options) {
						transformOptions(item.options, item.type != 'cascader').then((options) => {
							item.options = options
							item.type == "check" && !item.notAll && this.handleCheckedChange(item.name, this.model[item.name])
							resolve();
						})
					}
				})
			})
			Promise.all(asyncList).then(() => {
				this.asyncOptions = []
				this.$nextTick(function () {
					this.FormAuto && this.FormAuto.clearValidate()
				})
			})
		}

	}

	private generateRule(): void {
		this.rules = {};
		forEach(this.fields, (item, name) => {
			this.rules[name] = [];

			if (item.required === true) {
				let requiredRule: any = {
					required: true,
					message: this.$t("formauto.requiredText").replace('{1}', item.label || ''),
					trigger: "change",
				};
				if (/check|(date(time|)|time|month|year|number)(range|s)/.test(item.type) || (item.type == "select" && item.props.multiple) || (item.type == "cascader" && item.props && item.props.emitPath == true) || (item.type == "slider" && item.props && item.props.range == true)) {
					requiredRule.type = "array";
				} else if (/slider|rate/.test(item.type)) {
					requiredRule.type = "number"
				} else if (/select|radio/.test(item.type)) {
					requiredRule.type = "string";
					requiredRule.transform = function (v) { return `${v}` }
				} else if (item.type == "switch") {
					requiredRule.type = "boolean"
				} else {
					requiredRule.type = "string";
				}
				this.rules[name].push(requiredRule);
			}
			if (item.addRules && item.addRules.length > 0) {
				this.rules[name] = this.rules[name].concat(item.addRules);
			}
		});
	}

	public getModel(): Record<string, any> {
		let value = {}
		for (let name in this.fields) {
			let field = this.fields[name]
			if (field) {
				if (field.rangeName && field.type && (/range$/g.test(field.type) || (field.type == "slider" && field.props && field.props.range == true))) {
					let [sn, en] = field.rangeName;
					if (this.model[name] && this.model[name].length == 2) {
						let _value: any[] = cloneDeep(this.model[name]);
						let [sd, ed] = _value;
						if (sd && ed && field.valueFormat == "unix" && /date|time|month|week|year/g.test(field.type)) {
							sd = DATE_UNIX(sd, "unix");
							ed = DATE_UNIX(ed, "unix");
						}
						value[name] = [sd, ed]
						value[sn] = sd;
						value[en] = ed;
					}
				} else if (/(time|date(|time|s)|month(|s)|year(|s))(?!range)/.test(field.type) && field.valueFormat == "unix") {
					if (Array.isArray(this.model[name])) {
						value[name] = this.model[name].map(v => DATE_UNIX(v, "unix"))
					} else {
						value[name] = DATE_UNIX(this.model[name], "unix");
					}
				} else {
					value[name] = this.model[name]
				}
			}
		}
		return value
	}

	public setModel(model: Record<string, any>): void {
		for (let name in this.fields) {
			let field = this.fields[name]
			if (field) {
				let value = model[name];
				if (value !== undefined) {
					if (field.rangeName && field.type && (/range$/.test(field.type) || (field.type == "slider" && field.props && field.props.range == true))) {
						if (value && value.length == 2) {
							let [sd, ed] = value
							if (sd && ed && /time|date(|time)|month|year/.test(field.type) && field.valueFormat == "unix") {
								sd = DATE_UNIX(sd, "timestamp");
								ed = DATE_UNIX(ed, "timestamp");
							}
							if (!this.model[name] || !this.model[name].length || sd != this.model[name][0] || ed != this.model[name][1]) {
								this.model[name] = [sd, ed];
							}
						}
					} else if (field.type == "select" && field.remote) {
						value = this.selectEcho(name, value);
						if (value !== false) {
							this.model[name] = value;
						}
					} else if (/(time|date(|time|s)|(month|year)(|s))(?!range|select)$/.test(field.type) && field.valueFormat == "unix") {
						if (Array.isArray(value)) {
							let hasChange = false
							value = value.map((v: string, idx: number) => {
								let _value = DATE_UNIX(v, "timestamp")
								if (_value != this.model[name][idx]) {
									hasChange = true
								}
								return _value
							})
							if (hasChange) {
								this.model[name] = value
							}
						} else {
							value = DATE_UNIX(value, "timestamp");
							if (value != this.model[name]) {
								this.model[name] = value;
							}
						}
					} else if (value !== this.model[name]) {
						if (field.type == "check" && !field.notAll) {
							this.handleCheckedChange(name, value);
						}
						this.model[name] = value;
					}
				} else {
					this.model[name] = this.defaultValue[name]
				}
			}
		}
	}

	public refreshOptions(fieldName: string) {
		let field = this.fields[fieldName];
		if (field && field.remoteMethod) {
			field.remoteParams.query = "refresh";
			field.props.remoteMethod("");
			// this.echoOptions[fieldName] = [];
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
			let isChange = options.length != this.model[name].length;
			for (let i = 0; i < options.length; i++) {
				if (options[i] && options[i].label && options[i].value) {
					if (!echoOptions.find((option: Record<string, string>) => option.value == options[i].value)) {
						echoOptions.push(Object.assign({}, options[i]))
					}
					isChange = true;
					values.push(options[i].value);
				} else {
					if (options[i] != this.model[name][i]) {
						isChange = true;
					}
					values.push(options[i]);
				}
			}
			return isChange ? values : false
		} else if (options && options.label && options.value) {
			this.echoOptions[name] = [Object.assign({}, options)];
			return options.value;
		} else if (options != this.model[name]) {
			return options
		} else {
			return false;
		}
	}

	private selectOptions(name: string) {
		let field: ElFormAutoField = this.fields[name]
		if (field && Array.isArray(field.options) && field.remote && Array.isArray(this.echoOptions[name])) {
			let echoOpitons = this.echoOptions[name] || []
			return uniqBy(echoOpitons.concat(field.options), "value")
		}
		return field.options
	}

	public getOptions(fieldName: string): Record<string, any> {
		return keyBy(this.selectOptions(fieldName), "value")
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
		if (Array.isArray(this.fields[name].options)) {
			let options = this.fields[name].options as ElAutoOption[];
			let optionsCount = options.length;
			if (checkedCount > 0 && checkedCount < optionsCount) {
				this.check[name] = 2;
			} else {
				this.check[name] = checkedCount === optionsCount;
			}
		}
	}
	// #endregion

	/**
	 * @public
	 * 重置表单
	 */
	public reset(): void {
		this.echoOptions = {}
		if (this.FormAuto) {
			this.FormAuto.resetFields();
			for (let name in this.fields) {
				let field = this.fields[name];
				this.model[name] = field.value;
				if (field.type == "check" && !field.notAll) {
					this.handleCheckedChange(name, field.value)
				}
			}
			this.$nextTick(function () {
				this.FormAuto.clearValidate();
			})
		}
	}

	//#region 继承Form相关方法
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
	public validateField(props: string[] | string, callback?: (errorMessage: string) => void): void {
		return this.FormAuto && this.FormAuto.validateField(props, callback);
	}

	/**
	 * @public
	 * 清除验证
	 */
	public clearValidate(props?: string[] | string): void {
		return this.FormAuto && this.FormAuto.clearValidate(props);
	}
	//#endregion
}
</script>