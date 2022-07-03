<template>
	<div class="bonus-table-editor">
		<el-table :data="valueArr">
			<el-table-column v-for="(item,name) in data" :prop="name" :label="label" :width="item.width">
				<template slot-scope="{ row, $index }">
					<template v-if="item.slot">
						<dynamic-slot :name="item.slot" :data="{ item, model, name }"></dynamic-slot>
					</template>
					<template v-else-if="'component'==item.type">
						<component :is="item.component" v-bind="item.props" v-on="item.on"></component>
					</template>
					<template v-else-if="'plain' == item.type">
						<div v-bind="item.props">{{ model[name] || '-'}}</div>
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
							:readonly="item.disabled"
							v-bind="item.props"
							v-on="item.on"
						></el-input-number>
					</template>
					<template v-else-if="item.type == 'slider'">
						<el-slider v-model="model[name]" :disabled="item.disabled" v-bind="item.props" v-on="item.on"></el-slider>
					</template>
					<template v-else-if="item.type == 'switch'">
						<el-switch v-model="model[name]" :disabled="item.disabled" v-bind="item.props" v-on="item.on"></el-switch>
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
					<template v-else-if="item.type == 'check'">
						<el-checkbox
							v-if="!item.notAll"
							:indeterminate="check[name] == 2"
							v-model="check[name]"
							style="margin-right: 30px"
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
					<template v-else-if="item.type == 'select'">
						<el-select
							v-model="model[name]"
							v-select-scroll="item.loadScroll && item.props?item.props.remoteMethod:null"
							v-bind="item.props"
							v-on="item.on"
						>
							<el-option
								v-for="(option,key) in selectOptions(item)"
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
								label="加载中"
							>加载中</el-option>
						</el-select>
					</template>
					<template v-else-if="item.type == 'cascader'">
						<el-cascader
							v-if="Array.isArray(item.options)"
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
				</template>
			</el-table-column>
			<el-table-column prop="options" label="操作" width="80">
				<template slot-scope="{ $index }">
					<el-button type="text" class="text-c_r" @click="handleRemoveItem($index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { ElFormAutoField } from "../../types/form-auto";

@Component({})
export default class ElFormTable extends Vue {
	@Model("input", { type: Array, default: () => [] }) value!: Record<string, any>[];

	/**
	 * 表单项配置
	 * @type FormAutoFields
	 */
	@Prop(Object) readonly data!: Record<string, ElFormAutoField>;

	private mounted() {
	}

	@Watch("value", { immediate: true })
	private valueChange(value: Record<string, any>[]) {
		this.valueArr = value || [];
	}

	private valueArr: Record<string, any>[] = [];
	@Watch("valueArr", { deep: true })
	private valueArrChange() {
		this.$emit("input", this.valueArr);
	}

	get selectedProductIds(): string[] {
		return this.valueArr.filter(item => item.productId).map(item => item.productId)
	}

	private handleAddItem() {
		this.valueArr.push({});
	}

	private handleRemoveItem(index: number) {
		// window.MessageBox.
		this.valueArr.splice(index, 1);
	}
}
</script>

<style lang="scss">
</style>
