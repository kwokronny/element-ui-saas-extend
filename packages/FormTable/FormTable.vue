<template>
	<el-form
		class="el-form-table"
		ref="FormTable"
		:model="{model: value}"
		:rules="rules"
		:validate-on-rule-change="false"
	>
		<div class="el-form-table__option">
			<slot name="prepend">
				<slot name="option_perpend"></slot>
				<el-button
					@click="addItem()"
					icon="el-icon-plus"
					:disabled="itemLimit>-1 && value.length >= itemLimit"
				>{{$t("formtable.add")}}</el-button>
				<el-button
					@click="clear()"
					icon="el-icon-delete"
					type="danger"
					:disabled="value.length < 1"
				>{{$t("formtable.clear")}}</el-button>
				<slot name="option_append"></slot>
			</slot>
		</div>
		<el-table :data="value" v-bind="$attrs" v-on="$listeners">
			<el-table-column
				v-for="(item,name) in fields"
				:prop="name"
				:label="item.label"
				:width="item.width"
				:resizable="false"
				:key="name"
			>
				<template slot="header" slot-scope="scope">
					{{scope.column.label || " "}}
					<el-tooltip v-if="item.labelTooltip" :content="item.labelTooltip">
						<i class="el-icon-question"></i>
					</el-tooltip>
				</template>
				<template slot-scope="{ row, $index }">
					<el-form-item :prop="`model.${$index}.${name}`" :rules="rules[name]">
						<slot
							v-if="item.slot"
							:name="item.slot"
							v-bind:item="item"
							v-bind:model="row"
							v-bind:name="name"
						></slot>
						<template v-else-if="'component'==item.type">
							<component :is="item.component" v-bind="item.props" v-on="item.on"></component>
						</template>
						<template v-else-if="'plain'==item.type">
							<div v-bind="item.props">{{ row[name] || '-'}}</div>
						</template>
						<template v-else-if="/text|password|textarea/g.test(item.type)">
							<el-input
								:name="name"
								v-model="row[name]"
								:type="item.type"
								v-bind="item.props"
								v-on="item.on"
							></el-input>
						</template>
						<template v-else-if="item.type=='numberrange'">
							<el-number-range v-model="row[name]" v-bind="item.props" v-on="item.on"></el-number-range>
						</template>
						<template v-else-if="item.type == 'number'">
							<el-input-number
								v-model="row[name]"
								:readonly="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-input-number>
						</template>
						<template v-else-if="item.type == 'slider'">
							<el-slider v-model="row[name]" :disabled="item.disabled" v-bind="item.props" v-on="item.on"></el-slider>
						</template>
						<template v-else-if="item.type == 'switch'">
							<el-switch v-model="row[name]" :disabled="item.disabled" v-bind="item.props" v-on="item.on"></el-switch>
						</template>
						<template
							v-else-if="/year|month|week|date|dates|datetime|daterange|monthrange|datetimerange/.test(item.type)"
						>
							<el-date-picker
								v-model="row[name]"
								:type="item.type"
								:readonly="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-date-picker>
						</template>
						<template v-else-if="/time|timerange/.test(item.type)">
							<el-time-picker
								:is-range="item.type == 'timerange'"
								v-model="row[name]"
								:readonly="item.disabled"
								v-bind="item.props"
								v-on="item.on"
							></el-time-picker>
						</template>
						<template v-else-if="/radio|radiobutton/.test(item.type)">
							<el-radio-group v-model="row[name]" v-bind="item.props" v-on="item.on">
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
						<template v-else-if="item.type == 'check'">
							<!-- <el-checkbox
								v-if="!item.notAll"
								:indeterminate="check[name] == 2"
								v-model="check[name]"
								style="margin-right: 30px"
								@change="checkAll(name)"
							>{{$t("formauto.checkAll")}}</el-checkbox>-->
							<!-- @change="handleCheckedChange(name,$event)" -->
							<el-checkbox-group
								v-model="row[name]"
								style="display: inline"
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
						<template v-else-if="item.type=='select'">
							<el-select
								v-model="row[name]"
								v-select-scroll="item.loadScroll && item.props?item.props.remoteMethod:null"
								v-bind="item.props"
								v-on="item.on"
								@change="handleSelectChange(item,name,$index,$event)"
							>
								<el-option
									v-for="(option,key) in selectOptions(item,name,$index)"
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
						<template v-else-if="item.type == 'cascader'">
							<el-cascader
								v-if="Array.isArray(item.options)"
								v-model="row[name]"
								:options="item.options"
								v-bind="item.props"
								v-on="item.on"
							></el-cascader>
						</template>
						<template v-else-if="item.type == 'rate'">
							<el-rate
								v-model="row[name]"
								:style="{ marginTop: '8px' }"
								:disabled="item.disabled"
								show-score
								v-bind="item.props"
								v-on="item.on"
							></el-rate>
						</template>
					</el-form-item>
				</template>
			</el-table-column>
			<el-table-column prop="options" label width="80" fixed="right">
				<template slot-scope="{row, $index }">
					<slot name="table_body_option" v-bind:row="row" v-bind:index="$index">
						<el-button type="text" @click="removeItem($index)">{{$t("formtable.remove")}}</el-button>
					</slot>
				</template>
			</el-table-column>
		</el-table>
	</el-form>
</template>

<script lang="ts">
import { Form } from "element-ui";
import { Vue, Component, Prop, Model, Watch, Ref } from "vue-property-decorator";
import { cloneDeep, forEach, omit, uniqBy } from "lodash-es";
import { ElAutoMixinOptions, ElAutoOption, ElFormAutoField } from "types/saas-extend";
import { transformOptions } from "../util";
import locale from "../../src/mixin/locale"
import selectScroll from "../../src/mixin/selectScroll"
import { ValidateCallback } from "element-ui/types/form";

@Component({
	name: "ElFormTable",
	mixins: [locale, selectScroll],
})
export default class ElFormTable extends Vue {
	@Ref("FormAuto") readonly FormAuto!: Form;

	private fields: Record<string, ElFormAutoField> = {};
	private rules: Record<string, any> = {};

	@Prop(Object) readonly data!: Record<string, ElFormAutoField>;
	@Watch("data", { immediate: true, deep: true })
	private onDataChange(data: Record<string, ElFormAutoField>) {
		data && (this.generateRule(), this.generateModel())
	}

	@Prop({ type: Number, default: -1 }) readonly itemLimit!: number;
	@Model("input", { type: Array, default: () => [] }) value!: Record<string, any>[];

	@Watch("value", { immediate: true, deep: true })
	private onValueChange(model: Record<string, any>[]) {
		this.$emit("input", this.getModel());
	}

	/**
	 * @public
	 * 获取表单所有参数
	 */
	public getModel(): Record<string, any>[] {
		for (let i = 0; i < this.value.length; i++) {
			let model = this.value[i]
			for (let name in this.fields) {
				// if (!item.notSubmit) {
				let field = this.fields[name]
				if (field) {
					if (Array.isArray(model[name]) && model[name].length > 0 && field.rangeName && field.type && (/range$/g.test(field.type) || (field.type == "slider" && field.props && field.props.range == true))) {
						let [sn, en] = field.rangeName;
						let [sd, ed] = model[name];
						if (sd && ed && field.type == "daterange" && field.suffixTime == true) {
							sd += " 00:00:00";
							ed += " 23:59:59";
						}
						this.$set(model, sn, sd)
						this.$set(model, en, ed)
					} else if (field.type == "select" && field.remote) {
						let value = this.selectEcho(name, i, model[name]);
						if (value) {
							model[name] = value;
						}
					} else if (model[name] === undefined && this.defaultValue[name] !== undefined) {
						model[name] = this.defaultValue[name]
					}
				}
			}
		}
		return this.value
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

	private echoOptions: Record<string, any> = {}

	private selectEcho(name: string, idx: number, options: any): any {
		if (!this.echoOptions[name]) {
			this.echoOptions[name] = { [idx]: [] }
		}
		if (Array.isArray(options) && options.length > 0) {
			let echoOptions = this.echoOptions[name][idx];
			let values: string[] = []
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
			this.echoOptions[name][idx] = [Object.assign({}, options)];
			return options.value;
		} else {
			return false;
		}
	}

	private selectOptions(field: ElFormAutoField, name: string, idx: number) {
		if (Array.isArray(field.options) && field.remote && this.echoOptions[name]) {
			let echoOpitons = this.echoOptions[name][idx] || []
			return uniqBy(echoOpitons.concat(field.options), "value")
		}
		return field.options
	}

	private handleSelectChange(field: ElFormAutoField, name: string, idx: number, value: string | number) {
		let option = (field.options as ElAutoOption[]).find((option: ElAutoOption) => option.value == value);
		option && this.selectEcho(name, idx, option);
		if (field.on && field.on.change) {
			field.on.change(value);
		}
		return value
	}

	public addItem(model?: Record<string, any>) {
		if (this.itemLimit > -1 && this.itemLimit < this.value.length) return;
		this.value.push(Object.assign(model || {}, this.defaultValue));
	}

	public removeItem(index: number) {
		this.value.splice(index, 1);
	}

	public clear() {
		this.value.splice(0, this.value.length);
	}

	private defaultValue: Record<string, any> = {};

	/**
	 * 规范生成 model 
	 */
	private generateModel(): void {
		this.fields = cloneDeep(this.data) as Record<string, ElFormAutoField>;
		forEach(this.fields, (item, name) => {
			item.name = name;
			item.on = Object.assign({}, item.on);
			item.props = omit(item, ["value", "addRules", "label", "labelTooltip", "width", "type", "on", "slot", "bindShow", "rangeName", "suffixTime", "checkAll", "notSubmit", "required", "options"])
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
				item.props.valueFormat = "yyyy-MM-dd HH:mm:ss";
				item.props.format = "yyyy-MM-dd HH:mm:ss";
			} else if (/date/g.test(item.type)) {
				item.props.valueFormat = "yyyy-MM-dd";
				item.props.format = "yyyy-MM-dd";
			} else if (/time/g.test(item.type)) {
				item.props.valueFormat = "HH:mm:ss";
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
				// if (item.type == "check" && item.checkAll !== false) {
				// 	this.$set(this.check, name, false);
				// }
			}
			this.defaultValue[name] = item.value;
		})
		if (this.value.length < 1) {
			this.addItem()
		}
		this.asyncOptionsRequest()
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
						item.remoteParams.query = "switch_select";
						item.props.remoteMethod.call(item, "")
					}
					let originClearEvent = item.on.clear || (() => { })
					let self = this;
					item.on.clear = function () {
						originClearEvent()
						item.remoteParams.query = "clear";
						item.props.remoteMethod.call(item, "")
					}
				} else if (item.options) {
					let remoteMethod = item.options;
					item.remoteMethod = () => {
						transformOptions(remoteMethod, item.type != 'cascader').then((options) => {
							item.options = options
							// this.handleCheckedChange(item.name, this.value[item.name])
							this.$nextTick(function () {
								// this.FormT.clearValidate(item.name)
							})
						})
					}
					item.remoteMethod()
				}
			})
		}
	}

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
						if (item.props && item.props.range == true) {
							requiredRule.type = "array";
						} else {
							requiredRule.type = "number";
						}
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
}
</script>