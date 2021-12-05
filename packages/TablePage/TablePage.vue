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
					>{{$t("tablepage.search")}}</el-button>
					<el-button
						type="default"
						@click="resetSearch"
						v-bind="defaultButtonStyle"
					>{{$t("tablepage.reset")}}</el-button>
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
						<span class="el-table-page_header-selected-text" v-if="$attrs['row-key'] && multipleSelection"">
							{{$t("tablepage.selection[0]")}}
							<b>{{multipleSelection.length}}</b>
							{{$t("tablepage.selection[1]")}}
							<el-button type="text" @click="clearSelection">{{$t("tablepage.clear")}}</el-button>
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
						>{{$t("tablepage.customColumns")}}</el-button>
					</slot>
					<slot name="table_button"></slot>
				</div>
			</div>
			<div class="el-table-page_body">
				<el-table
					ref="TablePage"
					v-if="refresh"
					:data="record"
					v-bind="$attrs"
					v-on="$listeners"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column
						v-if="$attrs['row-key'] && multipleSelection"
						:selectable="selectable"
						type="selection"
						reserve-selection
					></el-table-column>
					<template v-for="(column,index) in headers">
						<template v-if="!column.hide">
							<el-table-column
								:fixed="column.fixed"
								:key="`column_${column.prop}_${index}`"
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
										<enum-tags
											:type="column.enum"
											:value="row[column.prop]"
											:enumTag="column.enumTag"
											:splitChar="column.splitChar"
										></enum-tags>
									</template>
									<template v-else-if="column.filtersFunc">{{ column.filtersFunc(row[column.prop]) }}</template>
									<template
										v-else-if="column.formatter"
									>{{ column.formatter(row,column,row[column.prop],$index) }}</template>
									<template v-else>{{ row[column.prop] }}</template>
									<template v-if="column.copy">
										<i
											class="el-table-page_copy-icon el-icon-copy-document"
											v-copy="typeof column.copy=='boolean' ? defaultCopy:()=>column.copy(row)"
										></i>
									</template>
								</template>
							</el-table-column>
						</template>
					</template>
				</el-table>
			</div>
			<slot name="table_append"></slot>
			<div class="el-table-page_pagination">
				<el-pagination
					v-if="total > 0"
					:current-page="page"
					:page-size.sync="limit"
					:page-sizes="pageSizes"
					:total="total"
					:layout="defaultPageLayout"
					@size-change="search()"
					@current-change="handlePageChange"
				></el-pagination>
				<slot name="page_append"></slot>
			</div>
		</component>
		<el-dialog
			v-if="customColumns"
			width="600px"
			:visible.sync="customColumnsDialog"
			:title="$t('tablepage.customColumns')"
		>
			<el-button type="text" @click="handleCustomColumnReset">{{$t("tablepage.reset")}}</el-button>
			<el-table-draggable>
				<el-table
					size="small"
					:data="sortColumns"
					border
					height="400px"
					row-key="prop"
					default-expand-all
					:tree-props="{children:'children',hasChildren:'hasChildren'}"
				>
					<el-table-column :label="$t('tablepage.sort')" width="70px">
						<i class="el-icon-sort" style="cursor: move"></i>
					</el-table-column>
					<el-table-column :label="$t('tablepage.column')" prop="prop">
						<template slot-scope="{row}">{{labelEnum[row.prop]}}</template>
					</el-table-column>
					<el-table-column :label="$t('tablepage.fixed')" width="200px" prop="fixed">
						<template slot-scope="{row}">
							<el-radio-group size="mini" v-if="!row.hasChildren" v-model="row.fixed">
								<el-radio-button label="left">{{$t("tablepage.fixedLeft")}}</el-radio-button>
								<el-radio-button :label="false">{{$t("tablepage.fixedNone")}}</el-radio-button>
								<el-radio-button label="right">{{$t("tablepage.fixedRight")}}</el-radio-button>
							</el-radio-group>
							<span v-else>多级表头不支持固定</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('tablepage.hide')" width="120px" prop="hide">
						<template slot-scope="{row}">
							<el-switch :inactive-value="true" :active-value="false" v-model="row.hide"></el-switch>
						</template>
					</el-table-column>
				</el-table>
			</el-table-draggable>
			<div slot="footer">
				<el-button
					type="text"
					v-bind="defaultButtonStyle"
					@click="handleCustomColumnClose"
				>{{$t("tablepage.cancel")}}</el-button>
				<el-button
					type="primary"
					v-bind="defaultButtonStyle"
					@click="handleCustomColumnSave"
				>{{$t("tablepage.save")}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Ref, Watch, PropSync } from "vue-property-decorator"
import { Table } from "element-ui"
import { omit, cloneDeep } from "lodash-es"
import ElTableDraggable from "element-ui-el-table-draggable"
import { ElAutoOption } from "types/saas-extend.js"
import { ElFormAutoField } from "../../types/form-auto"
import { ElTablePageColumn, ElTablePageDataMap } from "types/table-page"
import { transformOptions, arrayToRecord } from "../util"
import ElFormAuto from "../FormAuto";
import EnumTags from "./EnumTags.vue";
import DynamicSlot from "../components/DynamicSlot"

interface ElTablePageColumnSort {
	prop: string,
	fixed: "left" | "right" | boolean
	hide: boolean
}

@Component({
	name: "ElTablePage",
	components: {
		DynamicSlot, ElTableDraggable, ElFormAuto, EnumTags
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
		return this.buttonStyle || (this.$ELEMENT && this.$ELEMENT.tablePage?.buttonStyle) || {}
	}

	// get canCheck():boolean{
	// 	return !!this.$attrs['row-key'] && this.multipleSelection 
	// }

	@Prop({ type: String, validator: (value: string) => { return (new RegExp("card|default")).test(value) }, default: "default" }) layoutType!: string
	get wrapComponment(): string {
		return this.layoutType == "card" ? "el-card" : "div"
	}

	// # region 列相关
	@Prop({ type: Array, required: true, default: () => [] }) columns!: ElTablePageColumn[];
	private headers: ElTablePageColumn[] = [];
	private refresh: boolean = true;

	@Watch("columns", { immediate: true, deep: true })
	private handleColumnsChange() {
		this.headers = cloneDeep(this.columns)
		this.headers.forEach((column: ElTablePageColumn) => {
			column.props = omit(column, ["slot", "enum", "filters", "enumTag", "children", "splitChar", "addSearch", "search", "labelTooltip", "copy"])

			if (column.slot && typeof column.slot == "boolean") column.slot = column.prop;
			if (column.search) {
				let defaultForm: ElFormAutoField = {
					label: column.label,
					type: "text"
				}
				column.enum && (defaultForm.options = column.search.options || column.enum)
				this.addSearchField(column.prop, Object.assign(defaultForm, column.search))
			}
			// 追加搜索项
			if (column.addSearch) {
				for (let name in column.addSearch) {
					this.addSearchField(name, column.addSearch[name])
				}
			}
			// 获取全局过滤器及组件内过滤器对数据包装成一个函数使用
			if (column.filters) {
				column.filtersFunc = this.transfromFilter(column.filters)
			}
			if (column.enum) {
				transformOptions(column.enum).then((options: ElAutoOption[]) => {
					column.enum = arrayToRecord(options, { key: "value", value: "label" })
				});
			}
		})
		if (this.customColumns) {
			// 从localStorage获取存储的自定义列配置
			this.loadCustomColumns()
		}
		this.$nextTick(function () {
			this.search();
		})
	}

	private localFilter: Record<string, any> = this.$parent.$options.filters as Record<string, any>
	private transfromFilter(filter: string | Array<string | string[]>): (value: string) => any {
		if (typeof filter == "string") {
			let filterFunc = this.localFilter[filter] || Vue.filter(filter);
			if (filterFunc) {
				return filterFunc as (value: string) => any;
			}
		} else if (Array.isArray(filter)) {
			return filter.reduce((prev: any, current: any) => {
				if (typeof current == "string") {
					let filterFunc = this.localFilter[current] || Vue.filter(current);
					if (filterFunc) {
						filterFunc = (value: string) => {
							return filterFunc(prev(value))
						}
					} else {
						return prev
					}
				} else if (Array.isArray(current)) {
					let filterFunc = this.localFilter[current[0]] || Vue.filter(current[0]);
					if (filterFunc) {
						return (value: string) => {
							return filterFunc(prev(value), ...current.slice(1, current.length))
						}
					} else {
						return prev
					}
				}
			}, (value: string) => {
				return value;
			}) as (value: string) => any;
		}
		return (value: string) => { return value };
	}

	private defaultCopy(target: Node) {
		let container = target.parentNode
		if (container) {
			let text = container.textContent || (container as HTMLElement).innerText
			return text.trim()
		}
	};

	// #endregion

	// #region 搜索
	private filter: Record<string, any> = {}

	private addSearchField(name: string, field: ElFormAutoField) {
		if (!this.searchForm[name]) {
			if (field.slot) {
				let slot_name = field.slot == true ? name : field.slot
				field.slot = `search-${slot_name}`;
			}
			this.searchForm[name] = field
		}
	}

	public getParams(): Record<string, any> {
		return this.filter;
	}

	private searchForm: Record<string, ElFormAutoField> = {}
	private loading: boolean = false;
	@Prop({ type: Function, required: true }) request!: ((page: number, search?: Record<string, any>, pageSize?: number, from?: string) => Promise<Record<ElTablePageDataMap, any>>)


	get hasSearchCard(): boolean {
		return Object.keys(this.searchForm).length > 0
	}

	private record: Record<string, any>[] = []
	private page: number = 1
	private total: number = 0
	private limit: number = 15;
	@Prop(String) pageLayout!: string;
	@Prop({ type: Array, default: () => [15, 30, 50, 100] }) pageSizes!: number[];

	get defaultPageLayout(): string {
		return this.pageLayout || (this.$ELEMENT && this.$ELEMENT.tablePage?.pageLayout) || "total, sizes, prev, pager, next, jumper"
	}

	@Watch("request")
	private handleRequestChange() {
		if (this.request instanceof Function) {
			this.search(1)
		}
	}

	public resetSearch(): void {
		this.SearchForm.reset();
		this.search();
	}

	public async search(page: number = 1): Promise<void> {
		this.loading = true;
		let data: Record<ElTablePageDataMap, any> = await this.request(page, this.filter, this.limit)
		this.loading = false;
		if (Array.isArray(data)) {
			this.record = data;
			this.total = -1;
		} else if (data && data.record && data.page && data.pageSize && data.total) {
			this.record = data.record
			this.page = data.page
			this.limit = data.pageSize
			this.total = data.total
		} else {
			console.error("request params callback result error: is not array or interface{ page: number, pageSize: number, record: any[], total: number }")
		}
	}

	private handlePageChange(page: number) {
		this.search(page)
	}
	// #endregion

	// #region 多选
	@Prop({ type: Function }) selectable!: ((row: Record<string, any>, index: number) => boolean)
	@PropSync("selection", { type: Array }) multipleSelection!: any[]

	private mounted() {
		if (this.multipleSelection && this.multipleSelection.length) {
			this.multipleSelection.forEach((row: any) => {
				this.TablePage.toggleRowSelection(row)
			})
		}
	}

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
	private columnsSort: ElTablePageColumnSort[] = [] //当前应用的排序变量
	private sortColumns: ElTablePageColumnSort[] = [] //弹窗用的临时排序变量
	private labelEnum: Record<string, string> = {}

	public openCustomColumnDialog(): void {
		this.customColumnsDialog = true;
		this.sortColumns = JSON.parse(JSON.stringify(this.columnsSort))
	}

	private initColumnsSortData(): ElTablePageColumnSort[] {
		let columns = cloneDeep(this.columns)
		return columns.map((column: ElTablePageColumn) => {
			this.labelEnum[column.prop] = column.label;
			return Object.assign({}, {
				prop: column.prop,
				fixed: column.fixed || false,
				hide: column.hide || false,
			})
		})
	}

	private validColumnsHasChange(sortStorage: ElTablePageColumnSort[]) {
		return this.columns.every((item: ElTablePageColumn) => !sortStorage.find((i: ElTablePageColumnSort) => i.prop == item.prop)) || sortStorage.every((item: ElTablePageColumnSort) => !this.columns.find((i: ElTablePageColumn) => i.prop == item.prop))
	}

	private loadCustomColumns() {
		if (this.customColumns) {
			this.columnsSort = this.initColumnsSortData();
			let sortStorage: null | string = window.localStorage.getItem("ElTablePage_" + this.customColumns);
			if (sortStorage) {
				let sortColumns: ElTablePageColumnSort[] = JSON.parse(sortStorage)
				if (!this.validColumnsHasChange(sortColumns)) {
					this.columnsSort = sortColumns
				}
			}
			this.refresh = false;
			this.headers = this.columnsSort.map((item: ElTablePageColumnSort) => {
				let header = this.headers.find((i: ElTablePageColumn) => item.prop == i.prop);
				return Object.assign(header, item)
			})
			this.$nextTick(function () {
				this.refresh = true;
			})
		}
	}


	private handleCustomColumnSave() {
		if (this.customColumns == false) return
		window.localStorage.setItem("ElTablePage_" + this.customColumns, JSON.stringify(this.sortColumns))
		this.$emit("saved-custom-columns", JSON.stringify(this.sortColumns))
		this.loadCustomColumns()
		this.customColumnsDialog = false;
	}

	private async handleCustomColumnReset() {
		if (this.customColumns == false) return
		this.sortColumns = this.initColumnsSortData();
	}

	private handleCustomColumnClose() {
		this.customColumnsDialog = false;
	}
	// #endregion
}
</script>