<template>
	<span>
		<template v-if="enums || values.length">
			<template v-for="(v,i) in values">
				<component
					v-if="enums[v]"
					:is="enumTag"
					style="margin-right: 5px; margin-bottom: 5px;"
					:key="`enum_${i}`"
					v-bind="enums[v].props || {}"
				>{{ enums[v].label || '' }}</component>
			</template>
		</template>
		<template v-else>-</template>
	</span>
</template>

<script lang="ts">
import { ElAutoOption } from 'types'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class EnumTags extends Vue {
	@Prop({ default: () => [] }) value!: any
	@Prop(Object) enums!: Record<string, ElAutoOption>
	@Prop(String) splitChar!: string
	@Prop({ type: String, default: "span" }) enumTag!: string

	get values(): string[] {
		if (Array.isArray(this.value)) {
			return this.value
		} else if (this.splitChar && typeof this.value == "string") {
			return this.value.split(this.splitChar)
		} else {
			return [this.value]
		}
	}
}
</script>