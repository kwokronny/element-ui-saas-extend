<template>
	<el-table-column v-if="!column.hide" :fixed="column.fixed" :prop="column.prop" v-bind="column.props">
		<template slot="header" slot-scope="scope">
			{{column.label || " "}}
			<el-tooltip v-if="column.labelTooltip" :content="column.labelTooltip">
				<i class="el-icon-question"></i>
			</el-tooltip>
		</template>
		<template v-if="column.children">
			<table-column-reduce v-for="span in column.children" :key="`column_${span.prop}`" :column="span">
				<template v-for="(props,slot) in $scopedSlots" #[slot]="scope">
					<slot :name="slot" v-bind="scope" />
				</template>
			</table-column-reduce>
		</template>
		<template slot-scope="{row, $index}">
			<slot
				v-if="column.slot"
				:name="column.slot"
				v-bind:row="row"
				v-bind:column="column"
				v-bind:index="$index"
			></slot>
			<template v-else-if="column.enum">
				<enum-tags
					v-if="typeof column.enum == 'object'"
					:key="$index"
					:enums="column.enum"
					:value="row[column.prop]"
					:enumTag="column.enumTag"
					:splitChar="column.splitChar"
				></enum-tags>
			</template>
			<template v-else-if="column.filtersFunc">{{ column.filtersFunc(row[column.prop]) }}</template>
			<template v-else-if="column.formatter">{{ column.formatter(row,column,row[column.prop],$index) }}</template>
			<template v-else>
				<i
					v-if="column.copy"
					:key="`copy_${column.prop}_${$index}`"
					class="el-table-page_copy-icon el-icon-copy-document"
					v-copy="row[column.prop]"
				></i>
				{{ row[column.prop] }}
			</template>
		</template>
	</el-table-column>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import EnumTags from "./EnumTags.vue";

@Component({
	name: 'TableColumnReduce',
	components: {
		EnumTags
	}
})
export default class TableColumnReduce extends Vue {
	@Prop({ type: Object, default: () => ({}) }) column!: any
}
</script>