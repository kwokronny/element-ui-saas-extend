<template>
	<span>
		<component
			v-for="(v,i) in values"
			:is="enumTag"
			style="margin-right: 5px; margin-bottom: 5px;"
			:key="`enum_${i}`"
			v-bind="type[v].props"
		>{{ type[v].label }}</component>
	</span>
</template>

<script lang="ts">
import { ElAutoOption } from 'types'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class EnumTags extends Vue {
	@Prop({ type: [Number, String, Array], default: () => [] }) value!: string | string[]
	@Prop(Object) type!: Record<string, ElAutoOption>
	@Prop(String) splitChar!: string
	@Prop({ type: String, default: "span" }) enumTag!: string

	get values(): string[] {
		if (Array.isArray(this.value)) {
			return this.value
		} else if (this.splitChar) {
			return this.value.split(this.splitChar)
		} else {
			return [this.value]
		}

	}
}
</script>