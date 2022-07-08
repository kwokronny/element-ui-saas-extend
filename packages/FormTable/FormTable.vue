<template>
	<el-form
		class="el-form-table"
		ref="FormTable"
		:model="{model:valueArr}"
		:rules="rules"
		:validate-on-rule-change="false"
	>
		<div class="el-form-table__option">
			<el-button
				@click="handleAddItem()"
				:disabled="itemLimit>-1 && this.valueArr.length >= itemLimit"
			>添加</el-button>
		</div>
		<el-table :data="valueArr" border>
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
						<template v-if="item.slot">
							<dynamic-slot :name="item.slot" :data="{ item, model:row, name }"></dynamic-slot>
						</template>
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
									:value="option"
									:disabled="option.disabled"
								>
									<i v-if="option.icon" :class="option.icon"></i>
									<span>{{ option.label }}</span>
								</el-option>
								<el-option
									disabled
									v-if="item.remoteParams && item.remoteParams.optionLoading"
									value="el-formauto-option-loading"
									label="加载中"
								>加载中</el-option>
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
			<el-table-column prop="options" label="操作" width="80">
				<template slot-scope="{ $index }">
					<el-button type="text" @click="handleRemoveItem($index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-form>
</template>

<script lang="ts">
import { cloneDeep, forEach, omit, uniqBy } from "lodash-es";
import { transformOptions } from "../util";
import { ElAutoMixinOptions, ElAutoOption } from "types/saas-extend";
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { ElFormAutoField } from "../../types/form-auto";

@Component({})
export default class ElFormTable extends Vue {


	private mounted() {
		this.generateModel();
		this.generateRule();
	}

	@Model("input", { type: Array, default: () => [] }) value!: Record<string, any>[];

	/**
	 * 表单项配置
	 * @type FormAutoFields
	 */
	@Prop(Object) readonly data!: Record<string, ElFormAutoField>;
	@Prop({ type: Number, default: -1 }) readonly itemLimit!: number;
	private fields: Record<string, ElFormAutoField> = {};
	private rules: Record<string, any> = {};
	private check: Record<string, boolean | number> = {};

	/**
 * 复选框 全选
 */
	// private checkAll(name: string): void {
	// 	this.model[name] = [];
	// 	if (this.check[name] === true) {
	// 		let options = this.fields[name].options as Array<ElAutoOption>;
	// 		if (Array.isArray(options)) {
	// 			options.forEach((item: Record<string, any>) => {
	// 				!item.disabled && this.model[name].push(item.value);
	// 			});
	// 		}
	// 	}
	// }

	@Watch("value", { immediate: true })
	private valueChange(value: Record<string, any>[]) {
		this.valueArr = value || [];
	}

	private valueArr: Record<string, any>[] = [];
	@Watch("valueArr", { deep: true })
	private valueArrChange() {
		this.$emit("input", this.valueArr);
	}

	private echoOptions: Record<string, any> = {}

	private selectEcho(name: string, idx: number, options: any): any {
		if (!this.echoOptions[name]) {
			this.echoOptions[name] = { [idx]: [] }
		}
		if (Array.isArray(options)) {
			let echoOptions = this.echoOptions[name][idx];
			let values: string[] = []
			for (let i = 0; i < options.length; i++) {
				if (options[i] && options[i].label && options[i].value) {
					if (!echoOptions.find((option: Record<string, string>) => option.value == options[i].value)) {
						echoOptions.push(Object.assign({}, options[i]))
					}
					values.push(options[i].value);
				} else {
					values.push(options[i]);
				}
			}
			return values;
		} else if (options && options.label && options.value) {
			this.echoOptions[name][idx] = [options];
			return options.value;
		} else {
			return options;
		}
	}

	private selectOptions(field: ElFormAutoField, name: string, idx: number) {
		if (Array.isArray(field.options) && field.remote && this.echoOptions[name]) {
			let echoOpitons = this.echoOptions[name][idx] || []
			return uniqBy(field.options.concat(echoOpitons), "value")
		}
		return field.options
	}

	private handleSelectChange(field: ElFormAutoField, name: string, idx: number, option) {
		this.selectEcho(name, idx, option);
		let value: any = null;
		if (field.on && field.on.change) {
			value = field.on.change(option, option.value, name, idx);
		}
		return value || option.value;
	}

	private handleAddItem() {
		this.valueArr.push(Object.assign({}, this.defaultValue));
	}

	private handleRemoveItem(index: number) {
		this.valueArr.splice(index, 1);
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

			// let value = this.value[name] == undefined ? item.value : this.value[name]
			// if (item.type == "select") {
			// value = this.selectEcho(name, value)
			// }
			this.defaultValue[name] = item.value;
			if (this.valueArr && this.valueArr.length && item.type == "select") {
				this.valueArr.forEach((item: Record<string, any>, idx: number) => {
					item[name] = this.selectEcho(name, idx, item[name])
				})
			}
			// this.$set(this.model, name, value);
		})
		if (this.valueArr.length < 1) {
			this.handleAddItem()
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
					item.on.clear = function () {
						originClearEvent()
						item.remoteParams.query = "clear";
						item.echoOptions = []
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