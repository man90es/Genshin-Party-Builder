<template>
	<img :src="src" :style="{ borderColor: meta.colour }">
</template>

<script>
	export default {
		name: 'Element',
		props: ['meta'],
		computed: {
			src() {
				let images = require.context('../assets/elements', false, /\.png$/)
				return images(`./${this.meta.id}.png`)
			},
		}
	}
</script>

<style scoped>
	img {
		height: 1em;
		width: 1em;
		padding: 0.25em;
		border-radius: 50%;
		border: 0.15em solid transparent;
		position: absolute;
		background-color: #000;

		bottom: 1.25em;
	}
</style>
