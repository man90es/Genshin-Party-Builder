<template>
	<div v-if="meta" :class="{ 'character-wrapper': true, clickable, suggestion }">
		<img :src="src" :class="{ portrait: true, yellow: meta.stars == 5, purple: meta.stars == 4 }" @click="clickHandler">
		<Element :meta="meta.element" />
		<div>
			{{ meta.name + (0 && role ? ` as ${role}` : '') }}
		</div>
	</div>
	<div v-else :class="{ 'character-wrapper': true, clickable, suggestion: true }">
		<img :src="src" class="portrait" @click="clickHandler">
		<Element :meta="null"/>
		<div>
			Auto
		</div>
	</div>
</template>

<script>
	import Element from './Element.vue'
	import { ALL_CHARACTERS } from '../assets/data.js'

	export default {
		name: 'Character',
		props: ['characterID', 'role', 'suggestion', 'clickable', 'pIndex', 'cIndex'],
		components: {
			Element,
		},
		data() {
			return {
				meta: ALL_CHARACTERS[this.characterID]
			}
		},
		methods: {
			clickHandler() {
				if (this.clickable) {
					window.mitt.emit('character-clicked', {
						pIndex: this.pIndex,
						cIndex: this.cIndex,
						cID: this.meta ? this.meta.id : ''
					})
				}
			}
		},
		computed: {
			src() {
				let images = require.context('../assets/portraits', false, /\.png$/)
				return this.meta
					? images(`./${this.meta.name}.png`)
					: images('./Placeholder.png')
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

		& > div {
			line-height: 1.5em;
		}

		img {
			&:not(.element):not(.yellow):not(.purple) {
				background-color: #767a7d;
			}

			&.yellow {
				background-color: #b27329;
			}

			&.purple {
				background-color: #8870ab;
			}
		}
	}

	.portrait {
		height: 6em;
		width: 6em;
		border-radius: inherit;
		border-bottom-right-radius: 20%;
		border-bottom-left-radius: 0;
	}

	.suggestion {
		filter: grayscale(75%);
	}

	.clickable {
		cursor: pointer;
	}
</style>
