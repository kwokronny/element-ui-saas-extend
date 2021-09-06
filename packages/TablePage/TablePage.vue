<template>
	<div class="el-table-page" ref="MainElement">
		<component
			:is="wrapComponment"
			shadow="never"
			v-if="hasSearchCard"
			class="el-table-page__search-card"
		>
			<slot name="search_prepend"></slot>
			<el-form-auto
				ref="SearchForm"
				v-model="filter"
				:data="searchForm"
				inline
				:show-messeage="false"
				v-bind="searchProps"
			>
				<template v-for="search in searchForm" :slot="search.slot" slot-scope="{item,model,name}">
					<dynamic-slot
						v-if="search.slot"
						:name="search.slot"
						:data="{item,model,name}"
						:key="search.slot"
					></dynamic-slot>
				</template>
				<slot name="search_button">
					<el-button
						type="primary"
						icon="el-icon-search"
						@click="search(1)"
						:loading="loading"
						v-bind="defaultButtonStyle"
					>搜索</el-button>
					<el-button type="default" @click="resetSearch" v-bind="defaultButtonStyle">重置</el-button>
				</slot>
			</el-form-auto>
			<slot name="search_append"></slot>
		</component>
		<slot name="middle"></slot>
		<component :is="wrapComponment" shadow="never" class="el-table-page__table-card">
			<slot name="table_prepend"></slot>
			<div class="el-table-page_header">
				<div>
					<slot name="selection">
						<span class="el-table-page_header-selected-text" v-if="$attrs['row-key']">
							已选择
							<b>{{multipleSelection.length}}</b> 条
							<el-button type="text" @click="clearSelection">清空</el-button>
						</span>
					</slot>
					<slot name="selection_right"></slot>
				</div>
				<div>
					<slot name="custom_column_button">
						<el-button
							v-if="customColumns"
							icon="el-icon-setting"
							@click="openCustomColumnDialog"
							v-bind="defaultButtonStyle"
						>自定义列</el-button>
					</slot>
					<slot name="table_button"></slot>
				</div>
			</div>
			<el-table
				ref="TablePage"
				v-if="refresh"
				:data="record"
				@selection-change="handleSelectionChange"
				v-bind="$attrs"
				v-on="$listeners"
				v-loading="loading"
			>
				<el-table-column
					v-if="$attrs['row-key']"
					:selectable="selectable"
					type="selection"
					reserve-selection
				></el-table-column>
				<template v-for="column in headers">
					<el-table-column
						v-if="!column.hide"
						:fixed="column.fixed"
						:key="`column_${column.prop}`"
						v-bind="column.props"
					>
						<template slot="header" slot-scope="scope">
							{{scope.column.label || " "}}
							<el-tooltip v-if="column.labelTooltip" :content="column.labelTooltip">
								<i class="el-icon-question"></i>
							</el-tooltip>
						</template>
						<template slot-scope="{row, $index}">
							<dynamic-slot v-if="column.slot" :name="column.slot" :data="{row, column, index: $index}"></dynamic-slot>
							<template v-else-if="column.enum">
								<template v-if="Array.isArray(row[column.prop])">
									<template v-for="v in row[column.prop]">
										<component
											:is="column.enumTag||'span'"
											style="margin-right: 5px;"
											:key="`column_${column.prop}_${v}`"
											v-if="column.enum[v]"
											v-bind="column.enum[v].props"
										>{{ column.enum[v].label }}</component>
									</template>
								</template>
								<template v-else-if="column.splitChar">
									<template v-for="v in row[column.prop].split(column.splitChar)">
										<component
											:is="column.enumTag||'span'"
											style="margin-right: 5px;"
											v-if="column.enum[v]"
											:key="`column_${column.prop}_${v}`"
											v-bind="column.enum[v].props"
										>{{ column.enum[v].label }}</component>
									</template>
								</template>
								<template v-else>
									<component
										:is="column.enumTag||'span'"
										v-if="column.enum[row[column.prop]]"
										v-bind="column.enum[row[column.prop]].props"
									>{{ column.enum[row[column.prop]].label }}</component>
								</template>
							</template>
							<template v-else-if="column.filtersFunc">{{ column.filtersFunc(row[column.prop]) }}</template>
							<template
								v-else-if="column.formatter"
							>{{ column.formatter(row,column,row[column.prop],$index) }}</template>
							<template v-else>{{ row[column.prop] }}</template>
							<!-- <template v-if="column.copy && !column.slot">
								<i class="el-table-page_copy-icon el-icon-copy-document" title="复制"></i>
							</template>-->
						</template>
					</el-table-column>
				</template>
			</el-table>
			<slot name="table_append"></slot>
			<div class="el-table-page_pagination">
				<el-pagination
					:current-page="page"
					:page-size.sync="limit"
					:page-sizes="pageSizes"
					:total="total"
					:layout="defaultPageLayout"
					@current-change="handlePageChange"
				></el-pagination>
				<slot name="page_append"></slot>
			</div>
		</component>
		<el-dialog v-if="customColumns" width="600px" :visible.sync="customColumnsDialog" title="自定义列">
			<el-button type="text" @click="handleClickReset">重置列</el-button>
			<el-table-draggable>
				<el-table :data="columnsSort" border height="300px">
					<el-table-column label="排序" width="70px">
						<i class="el-icon-sort" style="cursor: move"></i>
					</el-table-column>
					<el-table-column label="表项" prop="label"></el-table-column>
					<el-table-column label="固定" width="200px">
						<template slot-scope="{row}">
							<el-radio-group size="mini" v-model="row.fixed">
								<el-radio-button label="left">左</el-radio-button>
								<el-radio-button :label="false">否</el-radio-button>
								<el-radio-button label="right">右</el-radio-button>
							</el-radio-group>
						</template>
					</el-table-column>
					<el-table-column label="隐藏" width="90px">
						<template slot-scope="{row}">
							<el-switch v-model="row.hide"></el-switch>
						</template>
					</el-table-column>
				</el-table>
			</el-table-draggable>
			<div slot="footer">
				<el-button type="text" v-bind="defaultButtonStyle" @click="handleClickClose">取消</el-button>
				<el-button type="primary" v-bind="defaultButtonStyle" @click="handleClickSave">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
// @ts-ignore
import DynamicSlot from "../components/DynamicSlot.js"
import { ElFormAutoField } from "../../types/form-auto"
import ElTableDraggable from "element-ui-el-table-draggable"
import { Table } from "element-ui"
import { ElTablePageColumn, ElTablePageDataMap } from "types/table-page"
import { Vue, Component, Prop, Ref, Watch, PropSync } from "vue-property-decorator"
import { transformOptions, arrayToRecord } from "../util"
import { ElAutoOption } from "types/saas-extend.js"
import ElFormAuto from "../FormAuto";
import { cloneDeep, omit } from "lodash"

interface ElTablePageColumnSort {
	prop: string,
	label: string,
	fixed: "left" | "right" | boolean
	hide: boolean
}

@Component({
	name: "ElTablePage",
	components: {
		DynamicSlot, ElTableDraggable, ElFormAuto
	},
	provide() {
		return {
			slotRoot: this
		}
	}
})
export default class ElTablePage extends Vue {
	@Ref("TablePage") readonly TablePage!: Table
	@Ref("SearchForm") readonly SearchForm!: ElFormAuto

	@Prop({ type: Object, default: () => { return {} } }) searchProps!: Record<string, any>;

	@Prop({
		type: Object,
		validator: (value: Record<string, boolean | string>) => {
			return Object.keys(value).findIndex((val: string) => !/size|plain|round/.test(val)) > -1
		}
	}) buttonStyle!: Record<string, any>;

	get defaultButtonStyle(): Record<"size" | "plain" | "round", string | boolean> {
		return this.buttonStyle || (this.$ELEMENT && this.$ELEMENT.buttonStyle) || {}
	}

	@Prop({ type: String, validator: (value: string) => { return (new RegExp("card|default")).test(value) }, default: "default" }) layoutType!: string
	get wrapComponment(): string {
		return this.layoutType == "card" ? "el-card" : "div"
	}

	// # region 列相关
	@Prop(Array) columns!: ElTablePageColumn[];
	private headers: ElTablePageColumn[] = [];
	private refresh: boolean = true;

	@Watch("columns", { immediate: true, deep: true })
	private async handleColumnsChange() {
		this.headers = cloneDeep(this.columns)
		this.headers.forEach(async (column: ElTablePageColumn) => {

			if (column.search && !this.searchForm[column.prop]) {
				let defaultForm: ElFormAutoField = {
					label: column.label,
					type: "text"
				}
				if (column.search.slot) {
					let name = column.search.slot == true ? column.prop : column.search.slot
					column.search.slot = `search-${name}`;
				}
				column.enum && (defaultForm.options = column.search.options || column.enum)
				this.searchForm[column.prop] = Object.assign(defaultForm, column.search);
			}
			// 追加搜索项
			if (column.addSearch) {
				for (let name in column.addSearch) {
					if (!this.searchForm[name]) {
						let field = column.addSearch[name]
						if (field.slot) {
							let name = field.slot == true ? column.prop : field.slot
							field.slot = `search-${name}`;
						}
						this.searchForm[name] = field
					}
				}
			}
			// 获取全局过滤器及组件内过滤器对数据包装成一个函数使用
			if (column.filters) {
				let localFilter: Record<string, any> = this.$parent.$options.filters as Record<string, any>
				if (typeof column.filters == "string") {
					let filterFunc = localFilter[column.filters] || Vue.filter(column.filters);
					if (filterFunc) {
						column.filtersFunc = filterFunc as (value: string) => any;
					}
				} else if (Array.isArray(column.filters)) {
					column.filtersFunc = column.filters.reduce((prev: any, current: any) => {
						if (typeof current == "string") {
							let filterFunc = localFilter[current] || Vue.filter(current);
							if (filterFunc) {
								return (value: any) => {
									return filterFunc(prev(value))
								}
							}
						} else if (Array.isArray(current)) {
							let filterFunc = localFilter[current[0]] || Vue.filter(current[0]);
							if (filterFunc) {
								return (value: any) => {
									return filterFunc(prev(value), ...current.slice(1, current.length))
								}
							}
						}
					}, (value: any) => {
						return value;
					}) as (value: string) => any;
				}
			}
			column.props = omit(column, ["slot", "enum", "filters", "splitChar", "addSearch", "search", "labelTooltip"])
			if (column.slot && typeof column.slot == "boolean") column.slot = column.prop;
			if (column.enum) {
				let options: ElAutoOption[] = await transformOptions(column.enum);
				column.enum = arrayToRecord(options, { key: "value", value: "label" })

			}
		})
		if (this.customColumns) {
			// 从localStorage获取存储的自定义列配置
			this.loadCustomColumns()
		}
	}

	// #endregion

	// #region 搜索
	private filter: Record<string, any> = {}

	public getParams(): Record<string, any> {
		return this.filter;
	}

	private searchForm: Record<string, ElFormAutoField> = {}
	private loading: boolean = false;
	@Prop(Function) request!: ((page: number, search?: Record<string, any>, pageSize?: number, from?: string) => Promise<Record<ElTablePageDataMap, any>>)

	get hasSearchCard(): boolean {
		return Object.keys(this.searchForm).length > 0
	}

	private record: Record<string, any>[] = []
	private page: number = 1
	private total: number = 0
	@PropSync("pageSize", { type: Number, default: 15 }) limit!: number;
	@Prop(String) pageLayout!: string;
	@Prop({ type: Array, default: () => [10, 15, 30, 50, 100] }) pageSizes!: number[];

	get defaultPageLayout(): string {
		return this.pageLayout || (this.$ELEMENT && this.$ELEMENT.pageLayout) || "total, sizes, prev, pager, next, jumper"
	}

	@Watch("request", { immediate: true })
	private handleRequestChange() {
		if (this.request instanceof Function) {
			this.search(1, "request_change")
		}
	}

	public resetSearch(): void {
		this.SearchForm.reset();
		this.search();
	}

	public async search(page: number = 1, from: string = "search"): Promise<void> {
		this.loading = true;
		let data: Record<ElTablePageDataMap, any> = await this.request(page, this.filter, this.limit, from)
		this.loading = false;
		this.record = data.record
		// this.prehandleRecord();
		this.page = data.page
		this.limit = data.pageSize
		this.total = data.total
	}

	private handlePageChange(page: number) {
		this.search(page, "page_change")
	}
	// #endregion

	// #region 多选
	@Prop({ type: Function }) selectable!: ((row: Record<string, any>, index: number) => boolean)
	@PropSync("selection", { type: Array, default: () => [] }) multipleSelection!: any[]

	private handleSelectionChange(selection: any[]) {
		this.multipleSelection = selection
		this.$emit("selection-change", selection)
	}

	public clearSelection(): void {
		this.TablePage.clearSelection();
	}
	// #endregion

	// #region 自定义列

	@Prop({ type: [Boolean, String], default: false }) customColumns!: boolean | string;

	private customColumnsDialog: boolean = false;
	private columnsSort: ElTablePageColumnSort[] = []

	public openCustomColumnDialog(): void {
		this.customColumnsDialog = true;
	}

	private initColumnsSortData() {
		this.columnsSort = this.columns.map((column: ElTablePageColumn) => {
			return Object.assign({}, {
				prop: column.prop,
				label: column.label,
				fixed: column.fixed || false,
				hide: column.hide || false,
			})
		})
	}

	private loadCustomColumns() {
		if (this.customColumns) {
			if (this.columnsSort.length == 0) {
				let sortStorage: null | string = window.localStorage.getItem("ElTablePage_" + this.customColumns);
				if (sortStorage) {
					this.columnsSort = JSON.parse(sortStorage)
				} else {
					this.initColumnsSortData();
				}
			}
		}
		this.refresh = false;
		let sortProp: string[] = []
		let props: string[] = this.headers.map((item: ElTablePageColumn) => item.prop)
		this.columnsSort = this.columnsSort.filter((item: ElTablePageColumnSort) => {
			let index = props.indexOf(item.prop);
			if (index > -1) {
				sortProp.push(item.prop)
				this.headers[index] = Object.assign(this.headers[index], item)
			}
			return index > -1;
		});
		this.headers.sort((a: ElTablePageColumn, b: ElTablePageColumn) => {
			return sortProp.indexOf(a.prop) - sortProp.indexOf(b.prop)
		})
		this.$nextTick(function () {
			this.refresh = true;
		})
	}


	private handleClickSave() {
		if (this.customColumns == false) return
		window.localStorage.setItem("ElTablePage_" + this.customColumns, JSON.stringify(this.columnsSort))
		this.$emit("saved-custom-columns", JSON.stringify(this.columnsSort))
		this.loadCustomColumns()
		this.customColumnsDialog = false;
	}

	private async handleClickReset() {
		if (this.customColumns == false) return
		window.localStorage.removeItem("ElTablePage_" + this.customColumns)
		this.columnsSort = []
		this.initColumnsSortData();
	}

	private handleClickClose() {
		this.customColumnsDialog = false;
	}
	// #endregion
}
</script>