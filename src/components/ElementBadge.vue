<template>
	<picture>
		<source
			:key="src.mime"
			:srcSet="src.path"
			:type="src.mime"
			v-for="src in srcList"
		/>
		<img
			:alt="props.elementId"
			:src="srcList.at(-1).path"
			:style="{ objectPosition: `${offset[0]}em ${offset[1]}em` }"
		/>
	</picture>
</template>

<script setup>
	import { computed } from "vue"
	import { useJsonDataStore } from "@/stores/jsonData"

	const props = defineProps({
		elementId: { type: String, required: true },
	})

	const jsonData = useJsonDataStore()

	const srcList = computed(() => {
		const path =
			process.env.VUE_APP_ASSETS_ENDPOINT +
			jsonData.spritesheets.elements.path

		return jsonData.spritesheets.elements.extensions.map((f) => ({
			path: path + "." + f,
			mime: "image/" + f,
		}))
	})

	const offset = computed(() => {
		const index = jsonData.spritesheets.elements.indices[props.elementId]
		return [index[0] * -1, index[1] * -1]
	})
</script>

<style scoped>
	picture {
		z-index: 1;
	}

	img {
		filter: drop-shadow(0 0 0.1em rgba(0, 0, 0, 0.5));
		height: 1em;
		inset: 0.25em auto auto 0.25em;
		object-fit: cover;
		position: absolute;
		width: 1em;
	}
</style>
