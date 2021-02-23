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
		height: 1em;
		width: 1em;
		padding: 0.25em;
		border-radius: 50%;
		border: 0.15em solid transparent;
		background-color: #000;
	}
</style>
