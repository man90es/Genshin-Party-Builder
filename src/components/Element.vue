<template>
	<img :src="src">
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import useAPI from "../hooks/api.js"

	const { data, getAssetURI } = useAPI()

	const props = defineProps({
		"elementId": { "type": String, "required": true }
	})

	const src = computed(() => {
		const name = data.value.elements.find(e => e.id === props.elementId)?.name
		return name ? getAssetURI("element", name) : ""
	})
</script>

<style scoped>
	img {
		position: absolute;
		left: 0.25em;
		top: 0.25em;
		height: 1em;
		width: 1em;
		filter: drop-shadow(0 0 0.1em rgba(0, 0, 0, 0.5));
	}
</style>
