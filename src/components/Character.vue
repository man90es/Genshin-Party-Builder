<template>
	<div v-if="meta" class="character-wrapper" :class="{ clickable, suggestion }">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})` }" @click="clickHandler">
		<Element :elementId="meta.element" />
		<div>{{ meta.name }}</div>
	</div>
	<div v-else class="character-wrapper clickable suggestion">
		<img :src="src" @click="clickHandler">
		<div>Auto</div>
	</div>
</template>

<script>
	import Element from './Element.vue'
	import data from "../assets/data.json"

	export default {
		props: ['characterID', 'role', 'suggestion', 'clickable', 'pIndex', 'cIndex'],
		components: {
			Element,
		},
		data() {
			return {
				meta: data.characters.find(c => c.id === this.characterID)
			}
		},
		methods: {
			clickHandler() {
				if (this.clickable) {
					window.mitt.emit('character-clicked', {
						pIndex: this.pIndex,
						cIndex: this.cIndex,
						cID:    this.meta?.id,
					})
				}
			}
		},
		computed: {
			src() {
				const images = require.context('../assets/portraits', false, /\.png$/)
				return images(`./${this.meta?.name}.png`)
			},

			bgSrc() {
				const images = require.context('../assets/backgrounds', false, /\.png$/)
				return images(`./${this.meta?.colour}.png`)
			}
		}
	}
</script>

<style scoped lang="scss">
	.character-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		background-color: var(--button-background-color);
		color: var(--button-font-color);
		border-radius: 5%;

		&.suggestion {
			filter: grayscale(75%);
		}

		&.clickable {
			cursor: pointer;
		}

		& > div {
			line-height: 1.5em;
		}

		img:first-child {
			background-image: url(../assets/backgrounds/grey.png);
			height: 6em;
			width: 6em;
			border-radius: inherit;
			border-bottom-right-radius: 20%;
			border-bottom-left-radius: 0;
			background-size: cover;
		}
	}
</style>
