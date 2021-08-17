<template>
	<img :src="src">
</template>

<script>
	export default {
		props: ['meta'],
		computed: {
			src() {
				const images = require.context('../assets/elements', false, /\.png$/)
				return images(`./${this.meta.name}.png`)
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
