<template>
	<el-form
		class="el-form-table"
		ref="FormTable"
		:model="{model: value}"
		:rules="rules"
		v-bind="$attrs"
		v-on="$listeners"
		:validate-on-rule-change="false"
	>
		<div class="el-form-table__header" v-if="!hiddenAdd">
			<slot name="add_perpend"></slot>
			<el-button
				class="el-form-table__add-button"
				@click="addRow()"
				icon="el-icon-plus"
				:disabled="maxlength>-1 && value.length >= maxlength"
			>{{$t("formtable.add")}}</el-button>
			<slot name="add_append"></slot>
		</div>
		<slot name="table_prepend"></slot>
		<el-table :data="model" v-bind="tableProps">
			<template v-for="(item,name) in fields">
				<el-table-column
					v-if="item.type!='hidden'"
					:prop="name"
					:label="item.label"
					v-bind="item.columnProps"
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
								v-bind:row="row"
								v-bind:name="name"
								v-bind:index="$index"
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
								<el-input-number v-model="row[name]" v-bind="item.props" v-on="item.on"></el-input-number>
							</template>
							<template v-else-if="item.type == 'slider'">
								<el-slider v-model="row[name]" :disabled="item.disabled" v-bind="item.props" v-on="item.on"></el-slider>
							</template>
							<template v-else-if="item.type == 'switch'">
								<el-switch v-model="row[name]" :disabled="item.disabled" v-bind="item.props" v-on="item.on"></el-switch>
							</template>
							<template v-else-if="/(year(|s)|month(|s)|week|date(s|time|))(range|)/.test(item.type)">
								<el-date-picker v-model="row[name]" :type="item.type" v-bind="item.props" v-on="item.on"></el-date-picker>
							</template>
							<template v-else-if="/time(select|range|)/.test(item.type)">
								<el-time-select
									v-if="item.type == 'timeselect'"
									v-model="row[name]"
									v-bind="item.props"
									v-on="item.on"
								></el-time-select>
								<el-time-picker
									v-else
									:is-range="item.type == 'timerange'"
									v-model="row[name]"
									v-bind="item.props"
									v-on="item.on"
								></el-time-picker>
							</template>
							<template v-else-if="/radio(|button)/.test(item.type)">
								<el-radio-group v-model="row[name]" v-bind="item.props" v-on="item.on">
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
							<template v-else-if="item.type=='select'">
								<el-select
									v-model="row[name]"
									v-select-scroll="item.loadScroll && item.props?item.props.remoteMethod:null"
									v-bind="item.props"
									v-on="item.on"
									@change="handleSelectChange(item,name,$index,$event)"
								>
									<template v-if="Array.isArray(item.options)">
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
									show-score
									v-bind="item.props"
									v-on="item.on"
								></el-rate>
							</template>
						</el-form-item>
					</template>
				</el-table-column>
			</template>
			<el-table-column v-if="!hiddenOption" prop="options" label width="80" fixed="right">
				<template slot-scope="{row, $index}">
					<slot name="row_option" v-bind:row="row" v-bind:index="$index">
						<el-popconfirm
							v-if="removeConfirmMessage"
							icon="el-icon-info"
							icon-color="red"
							:title="removeConfirmMessage"
							@confirm="removeRow($index)"
						>
							<el-button
								type="text"
								slot="reference"
								class="el-form-table__remove"
							>{{$t("formtable.remove")}}</el-button>
						</el-popconfirm>
						<el-button
							v-else
							type="text"
							slot="reference"
							class="el-form-table__remove"
							@click="removeRow($index)"
						>{{$t("formtable.remove")}}</el-button>
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
import { ElAutoMixinOptions, ElAutoOption, ElFormTableField } from "types/form-table";
import { transformOptions } from "../../src/util";
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
	name: "ElFormTable",
	mixins: [locale, selectScroll],
})
export default class ElFormTable extends Vue {
	@Ref("FormTable") readonly FormTable!: Form;

	@Prop(Object) tableProps!: Record<string, any>;
	@Prop({ type: Number, default: -1 }) maxlength!: number;
	@Prop({ type: Boolean, default: false }) hiddenOption!: boolean;
	@Prop({ type: [String, Boolean], default: false }) removeConfirmMessage!: boolean | string;
	@Prop({ type: Boolean, default: false }) hiddenAdd!: boolean;

	@Model("input", { type: Array, default: () => [] }) value!: Record<string, any>[];

	private model: Record<string, any>[] = [];
	@Watch("model", { immediate: true, deep: true })
	private onModelChange() {
		this.$emit("input", this.getModel())
	}

	private valuePrehandle(index: number, name: string, value: any) {
		let field = this.fields[name]
		if (field) {
			if (field.rangeName && field.type && (/range$/g.test(field.type) || (field.type == "slider" && field.props && field.props.range == true))) {
				if (value && value.length == 2) {
					let [sd, ed] = value
					if (sd && ed && /date|datetime|month|year/g.test(field.type) && field.valueFormat == "unix") {
						sd = DATE_UNIX(sd, "timestamp");
						ed = DATE_UNIX(ed, "timestamp");
					}
					return [sd, ed];
				}
			} else if (field.type == "select" && field.remote) {
				value = this.selectEcho(name, index, value);
				return value;
			} else if (/(date(|time|s)|month|year)(?!range)/g.test(field.type) && field.valueFormat == "unix") {
				if (Array.isArray(value)) {
					value = cloneDeep(value).map(v => DATE_UNIX(v, "timestamp"))
					return value;
				} else {
					value = DATE_UNIX(value, "timestamp");
					return value;
				}
			} else {
				return value;
			}
		}
	}
	/**
	 * @public
	 * 获取表单所有参数
	 */
	public getModel(): Record<string, any>[] {
		let value: Record<string, any>[] = []
		for (let i = 0; i < this.model.length; i++) {
			let row: Record<string, any> = {}
			for (let name in this.fields) {
				let field = this.fields[name]
				if (field) {
					if (field.rangeName && field.type && (/range$/g.test(field.type) || (field.type == "slider" && field.props && field.props.range == true))) {
						let [sn, en] = field.rangeName;
						if (this.model[i][name] && this.model[i][name].length == 2) {
							let _value = cloneDeep(this.model[i][name]);
							let [sd, ed] = _value;
							if (sd && ed && /date|time|month|year/g.test(field.type) && field.valueFormat == "unix") {
								sd = DATE_UNIX(sd, "unix");
								ed = DATE_UNIX(ed, "unix");
							}
							row[name] = [sd, ed]
							row[sn] = sd;
							row[en] = ed;
						}
					} else if (/(time|date(|time|s)|month(|s)|year(|s))(?!range)/.test(field.type) && field.valueFormat == "unix") {
						if (Array.isArray(this.model[i][name])) {
							row[name] = this.model[i][name].map(v => DATE_UNIX(v, "unix"))
						} else {
							row[name] = DATE_UNIX(this.model[i][name], "unix");
						}
					} else {
						row[name] = this.model[i][name]
					}
				}
			}
			value.push(row);
		}
		return value
	}

	/**
	 * @public
	 * 设置表单
	 */
	public setModel(model: Record<string, any>[]): void {
		let newModel: Record<string, any>[] = []
		for (let i = 0; i < model.length; i++) {
			let row: Record<string, any> = cloneDeep(this.defaultValue)
			for (let name in this.fields) {
				let value = model[i][name];
				if (value !== undefined) {
					row[name] = this.valuePrehandle(i, name, value)
				}
			}
			newModel.push(row)
		}
		this.model = newModel
	}

	public addRow(model?: Record<string, any>) {
		if (this.maxlength > -1 && this.maxlength < this.model.length) return;
		this.model.push(Object.assign(cloneDeep(this.defaultValue), model || {}));
	}

	public setRow(index: number, modelOrName: Record<string, any> | string, value?: any) {
		if (!this.model[index] || !modelOrName) return;
		if (typeof modelOrName == "string") {
			this.model[index][modelOrName] = this.valuePrehandle(index, modelOrName, value);
		} else if (Object.keys(modelOrName).length > 0) {
			for (let name in modelOrName) {
				this.model[index][name] = this.valuePrehandle(index, name, modelOrName[name])
			}
			this.model.splice(index, 1, modelOrName);
		}
	}

	public removeRow(index: number) {
		this.model.splice(index, 1);
	}

	//#region select回显相关
	private echoOptions: Record<string, any> = {}

	private selectEcho(name: string, idx: number, options: any): any {
		if (!this.echoOptions[name]) {
			this.echoOptions[name] = {}
		}
		if (!this.echoOptions[name][idx]) {
			this.echoOptions[name][idx] = []
		}
		if (Array.isArray(options) && options.length > 0) {
			let echoOptions = this.echoOptions[name][idx];
			let values: string[] = []
			// let isChange = false;
			for (let i = 0; i < options.length; i++) {
				if (options[i] && options[i].label && options[i].value) {
					if (!echoOptions.find((option: Record<string, string>) => option.value == options[i].value)) {
						echoOptions.push(Object.assign({}, options[i]))
					}
					// isChange = true;
					values.push(options[i].value);
				} else {
					values.push(options[i]);
				}
			}
			return values
		} else if (options && options.label && options.value) {
			this.echoOptions[name][idx].push(Object.assign({}, options));
			return options.value;
		} else {
			return options;
		}
	}

	private selectOptions(field: ElFormTableField, name: string, idx: number) {
		if (Array.isArray(field.options) && field.remote && this.echoOptions[name]) {
			let echoOpitons = this.echoOptions[name][idx] || []
			return uniqBy(echoOpitons.concat(field.options), "value")
		}
		return field.options
	}

	private handleSelectChange(field: ElFormTableField, name: string, idx: number, value: Array<string | number> | string | number) {
		let option = (field.options as ElAutoOption[]).filter((option: ElAutoOption) => (Array.isArray(value) && value.includes(option.value)) || value == option.value);
		option && this.selectEcho(name, idx, option);
		if (field.on && field.on.change) {
			return field.on.change(value);
		}
		return value
	}
	//#endregion

	//#region 初始化
	@Prop(Object) readonly data!: Record<string, ElFormTableField>;

	private fields: Record<string, ElFormTableField> = {};
	private defaultValue: Record<string, any> = {};
	private rules: Record<string, any> = {};

	@Watch("data", { immediate: true, deep: true })
	private onDataChange(data: Record<string, ElFormTableField>) {
		data && (this.generateModel(), this.generateRule())
	}

	private generateModel(): void {
		forEach(this.data, (item, name) => {
			let field: ElFormTableField;
			if (!this.fields[name]) {
				field = cloneDeep(item);
			} else {
				field = this.fields[name];
			}
			let notProps = ["value", "addRules", "fixed", "label", "labelTooltip", "width", "type", "on", "slot", "bindShow", "rangeName", "valueFormat", "suffixTime", "required", "options"]
			notProps.forEach((key: string) => {
				if (item[key] !== undefined && !/on|options/.test(key)) {
					field[key] = item[key];
				}
			})
			field.props = Object.assign(field.props || {}, omit(item, notProps))
			field.columnProps = Object.assign(field.columnProps || {}, item.columnProps || {})
			field.on = item.on || {}
			// field.type = item.type || "text"
			// 字段属性 slot 值为布尔值时，动态插槽 name 为字段名
			if (item.slot) {
				field.slot = typeof item.slot == "boolean" ? name : item.slot;
			}
			// 根据字段 type 设置 model 默认值
			if (
				/(check|numberrange|cascader)/g.test(item.type) ||
				(item.type == "select" && field.props.multiple === true)) {
				field.value = item.value || [];
			} else if (item.type == "slider" && field.props.range === true) {
				let min = field.props.min || 0
				let max = field.props.max || 100
				field.value = item.value || [min, max];
			} else if (/rate|number|slider/.test(item.type)) {
				field.value = parseInt(item.value) || 0;
			} else if (item.type == "switch") {
				field.value = item.value === undefined ? false : item.value;
			} else if (/(date(s|time|)|time(?!select)|month(|s)|year(|s)|week)(range|)/.test(item.type)) {
				field.props.valueFormat = field.valueFormat == "unix" ? "timestamp" : field.valueFormat;
				if (/datetime/g.test(item.type)) {
					field.props.valueFormat = field.props.valueFormat || "yyyy-MM-dd HH:mm:ss";
					if (item.type == "datetimerange") {
						field.props.defaultTime = field.props.defaultTime || ["00:00:00", "23:59:59"]
					}
				} else if (/date/g.test(field.type)) {
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
					field.value = item.value || null;
				} else {
					field.value = item.value || ""
				}
			} else {
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
			} if (/date|time|datetime|select|week|year|month|dates|cascader/g.test(item.type)) {
				field.props.placeholder = item.placeholder || `${this.$t("formauto.pleaseSelect")}${item.label}`;
			} else {
				field.props.placeholder = item.placeholder || `${this.$t("formauto.pleaseInput")}${item.label}`;
			}

			if (this.$ELEMENT && this.$ELEMENT.pickerOptions && /date/g.test(field.type)) {
				let type = /range/g.test(item.type) ? "range" : "date"
				let pickerOptions = this.$ELEMENT.pickerOptions[type];
				if (pickerOptions) {
					field.props.pickerOptions = Object.assign({}, pickerOptions, field.props.pickerOptions);
				}
			}

			if (/text|password|textarea|select|cascader/.test(field.type)) {
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
			}

			if (field.type == "select" && field.remote) {
				let originVisibleChangeEvent = field.on["visible-change"] || (() => { })
				let originClearEvent = field.on.clear || (() => { })
				field.on["visible-change"] = function (visible) {
					originVisibleChangeEvent(visible)
					field.remoteParams.query = "switch_select";
					field.props.remoteMethod.call(field, "")
				}
				field.on.clear = function () {
					originClearEvent()
					field.remoteParams.query = "clear";
					field.props.remoteMethod.call(field, "")
				}
			}
			this.defaultValue[name] = field.value;
			this.fields[name] = field
		})
		if (this.model.length < 1) {
			this.addRow()
		}
		this.asyncOptionsRequest()
	}

	private asyncOptions: ElFormTableField[] = [] //统一处理options
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
						let remoteMethod = item.options;
						item.remoteMethod = () => {
							transformOptions(remoteMethod, item.type != 'cascader').then((options) => {
								item.options = options
								resolve();
							})
						}
						item.remoteMethod()
					}
				})
			})
			Promise.all(asyncList).then(() => {
				this.asyncOptions = []
				this.$nextTick(function () {
					this.FormTable && this.FormTable.clearValidate()
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
				if (/check|((date(time|)|time|month|year|number)(range|s))/.test(item.type) || (item.type == "select" && item.props.multiple) || (item.type == "cascader" && (!item.props.props || item.props.props.emitPath !== false)) || (item.type == "slider" && item.props.range == true)) {
					requiredRule.type = "array";
				} else if (/slider|rate/.test(item.type)) {
					requiredRule.type = "number"
				} else if (/select|radio|cascader/.test(item.type)) {
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
	//#endregion


	//#region 继承Form相关方法
	/**
	 * @public
	 * 异步验证成功后获取表单所有参数
	 */
	public validate(cb?: ValidateCallback): Promise<boolean> | void {
		return cb ? this.FormTable.validate(cb) : this.FormTable.validate();
	}

	/**
	 * @public
	 * 验证所有行或单个行的多个字段
	 */
	public validateField(props: string[] | string, callback?: (errorMessage: string) => void, index?: number): void {
		let _props: string[] | string = []
		if (index) {
			_props = Array.isArray(props) ? props.map((prop: string) => `model.${index}.${prop}`) : `model.${index}.${props}`
		} else {
			for (let i = 0; i <= this.model.length; i++) {
				Array.isArray(props) ? _props.push(...props.map((prop: string) => `model.${i}.${prop}`)) : _props.push(`model.${i}.${props}`)
			}
		}
		return this.FormTable && this.FormTable.validateField(_props, callback);
	}

	/**
	 * @public
	 * 清除验证
	 */
	public clearValidate(props?: string[] | string): void {
		return this.FormTable && this.FormTable.clearValidate(props);
	}
	//#endregion
}
</script>