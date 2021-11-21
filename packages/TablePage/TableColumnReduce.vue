<template>
	<el-table-column :fixed="column.fixed" v-bind="column.props">
		<template slot="header" slot-scope="scope">
			{{scope.column.label || " "}}
			<el-tooltip v-if="column.labelTooltip" :content="column.labelTooltip">
				<i class="el-icon-question"></i>
			</el-tooltip>
		</template>

		<template v-if="column.children && column.children.length">
			<template v-for="(c,idx) in column.children">
				<TableColumnReduce v-if="!c.hide" :key="`column_${c.prop}_${idx}`" :column="c"></TableColumnReduce>
			</template>
		</template>
		<template slot-scope="{row, $index}">
			<dynamic-slot v-if="column.slot" :name="column.slot" :data="{row, column, index: $index}"></dynamic-slot>
			<template v-else-if="column.enum">
				<template v-if="Array.isArray(row[column.prop])">
					<template v-for="v in row[column.prop]">
						<component
							:is="column.enumTag||'span'"
							style="margin-right: 5px;"
							:key="`column_${column.prop}${$index}_${v}`"
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
							:key="`column_${column.prop}${$index}_${v}`"
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
			<template v-else-if="column.formatter">{{ column.formatter(row,column,row[column.prop],$index) }}</template>
			<template v-else>{{ row[column.prop] }}</template>
			<template v-if="column.copy && !column.slot">
				<i class="el-table-page_copy-icon el-icon-copy-document" v-copy="row[column.prop]" title="复制"></i>
			</template>
		</template>
	</el-table-column>
</template>

<script lang="ts">
import { TableColumn } from 'element-ui/types/table-column'
import { Vue, Component, Prop } from 'vue-property-decorator'
import DynamicSlot from "../components/DynamicSlot"

@Component({
	name: "TableColumnReduce",
	components: {
		DynamicSlot
	}
})
export default class TableColumnReduce extends Vue {
	@Prop({ type: Object, default: () => { return {} } }) column!: TableColumn
}
</script>