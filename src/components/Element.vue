<template>
	<img :src="src">
</template>

<script>
	import data from "../assets/data.json"

	export default {
		props: ["elementId"],
		computed: {
			src() {
				const images = require.context('../assets/elements', false, /\.png$/)
				return images(`./${data.elements.find(e => e.id === this.elementId).name}.png`)
			},
		}
	}
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
