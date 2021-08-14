<template>
	<img v-if="meta" class="element" :src="src" :style="{ borderColor: meta.colour }">
	<div v-else class="element" style="opacity: 0"></div>
</template>

<script>
	export default {
		name: 'Element',
		props: ['meta'],
		computed: {
			src() {
				let images = require.context('../assets/elements', false, /\.png$/)
				return images(`./${this.meta.name}.png`)
			},
		}
	}
</script>

<style scoped>
	.element {
		position: absolute;
		left: 0.25em;
		top: 0.25em;
		height: 1em;
		width: 1em;
		filter: drop-shadow(0 0 0.1em rgba(0, 0, 0, 0.5));
	}
</style>
