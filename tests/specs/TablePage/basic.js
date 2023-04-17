import { expect } from "chai";
import { createVue, waitImmediate } from "../../util";
import { mock, Random } from "mockjs";

export default () => {
	let vm;

	let columnData = mock({
		"data|5-10": [
			{
				"prop": "@word",
				"label": "@cword",
				"children|0-3": [
					{
						"prop": "@word",
						"label": "@cword",
					}
				]
			}
		]
	})

	it("props:columns", async () => {
		vm = createVue(
			{
				template: `<el-table-page ref="table" :columns="columns" :request="getList"></el-table-page>`,
				data() { return { columns: columnData.data } },
				methods: {
					getList() { return [] },
				},
			},
			true);
		await waitImmediate()
		let tableColumn = vm.$refs.table.$refs.Table.layout.store.states._columns;
		function expectHeader(columns, validData) {
			columns.forEach((column, idx) => {
				expect(column.label).to.equal(validData[idx].label)
				expect(column.property).to.equal(validData[idx].prop)
				column.fixed && expect(column.fixed).to.equal(validData[idx].fixed || false)
				column.children && expectHeader(column.children, validData[idx].children)
			})
		}
		expectHeader(tableColumn, columnData.data)
	})

	it("props:page-sizes and page-layout", async () => {
		let columnData = mock({
			"data|5-10": [
				{
					"prop": "@word",
					"label": "@cword",
					"children|0-3": [
						{
							"prop": "@word",
							"label": "@cword",
						}
					]
				}
			]
		})

		vm = createVue({
			template: `<el-table-page ref="table" :columns="columns" :request="getList"></el-table-page>`,
			data() { return { columns: columnData.data }, pageSize: 15 },
			methods: {
				getList() {
					// expect(pageSize).to.equal()
					return mock({
						page: 1,
						total: 100,
						pageSize: this.pageSize,
						[`record|${this.pageSize}`]: [
						]
					})
				},
			},
		}, true);
		await waitImmediate()
		let tableColumn = vm.$refs.table.$refs.Table.layout.store.states._columns;
		function expectHeader(columns, validData) {
			columns.forEach((column, idx) => {
				expect(column.label).to.equal(validData[idx].label)
				expect(column.property).to.equal(validData[idx].prop)
				column.fixed && expect(column.fixed).to.equal(validData[idx].fixed || false)
				column.children && expectHeader(column.children, validData[idx].children)
			})
		}
		expectHeader(tableColumn, columnData.data)
	})


}