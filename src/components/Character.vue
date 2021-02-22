<template>
	<div class="wrapper">
		<img :src="src" :class="{ portrait: true, yellow: meta.stars == 5, purple: meta.stars == 4 }">
		<Element :meta="meta.element" />
		<div>
			{{role || meta.name}}
		</div>
	</div>
</template>

<script>
	import Element from './Element.vue'

	export default {
		name: 'Character',
		props: ['meta', 'role'],
		components: {
			Element
		},
		computed: {
			src() {
				let images = require.context('../assets/portraits', false, /\.png$/)
				return images(`./${this.meta.id}.png`)
			},
		}
	}
</script>

<style scoped>
	.wrapper {
		flex-direction: column;
		margin-bottom: 1em;
		align-items: center;
		position: relative;
		gap: 0.5em;
	}

	.portrait {
		height: 70px;
		width: 70px;
		border-radius: 5%;
		border: 0.15em solid transparent;
		margin: 0.5em;
	}

	.yellow {
		border-color: yellow;
	}

	.purple {
		border-color: darkviolet;
	}
</style>
