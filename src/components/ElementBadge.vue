<template>
	<picture>
		<source v-for="src in srcList" :key="src.mime" :srcSet="src.path" :type="src.mime">
		<img :src="srcList.at(-1).path" :style="{ objectPosition: `${offset[0]}em ${offset[1]}em` }">
	</picture>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"

	const store = useStore()

	const props = defineProps({
		"elementId": { "type": String, "required": true }
	})

	const srcList = computed(() => {
		const path = `${process.env.VUE_APP_ASSETS_ENDPOINT}${store.state.data.spritesheets.elements.filePath}`
		return store.state.data.spritesheets.elements.extensions.map(f => ({ path: path + "." + f, mime: "image/" + f }))
	})

	const offset = computed(() => {
		const index = store.state.data.spritesheets.elements.indices[props.elementId]

		return [index[0] * -1, index[1] * -1]
	})
</script>

<style scoped>
	picture {
		z-index: 1;
	}

	img {
		object-fit: cover;
		position: absolute;
		left: 0.25em;
		top: 0.25em;
		height: 1em;
		width: 1em;
		filter: drop-shadow(0 0 0.1em rgba(0, 0, 0, 0.5));
	}
</style>
