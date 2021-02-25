<template>
	<div v-if="meta" :class="{ 'character-wrapper': true, clickable, suggestion }">
		<img :src="src" :class="{ portrait: true, yellow: meta.stars == 5, purple: meta.stars == 4 }" @click="clickHandler">
		<div class="character-tags">
			<Element :meta="meta.element" />
			<Constellation :level="$store.getters.constellation(characterID)" />
		</div>
		<div>
			{{ meta.name + (role ? ` as ${role}` : '') }}
		</div>
	</div>
	<div v-else :class="{ 'character-wrapper': true, clickable, suggestion: true }">
		<img :src="src" class="portrait" @click="clickHandler">
		<div class="character-tags">
			<Element :meta="null"/>
			<Constellation :level="null" />
		</div>
		<div>
			Auto
		</div>
	</div>
</template>

<script>
	import Element from './Element.vue'
	import Constellation from './Constellation.vue'
	import { ALL_CHARACTERS } from '../assets/data.js'

	export default {
		name: 'Character',
		props: ['characterID', 'role', 'suggestion', 'clickable', 'pIndex', 'cIndex'],
		components: {
			Element,
			Constellation
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
					: images('./Bao\'er.png')
			}
		}
	}
</script>

<style scoped>
	.character-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.character-tags {
		margin-top: -4.6rem;
		margin-left: -4.65rem;
		margin-bottom: 1rem;
	}

	.portrait {
		height: 4.5rem;
		width: 4.5rem;
		border-radius: 5%;
		border: 0.15em solid grey;
		margin: 0.25em;
	}

	.yellow {
		border-color: yellow;
	}

	.purple {
		border-color: darkviolet;
	}

	.suggestion {
		filter: grayscale(75%); 
	}

	.clickable {
		cursor: pointer;
	}
</style>
