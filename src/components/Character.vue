<template>
	<div v-if="meta" :class="{ 'character-wrapper': true, suggestion }">
		<img :src="src" :class="{ portrait: true, yellow: meta.stars == 5, purple: meta.stars == 4 }">
		<div class="character-tags">
			<Element :meta="meta.element" />
			<Constellation :level="$store.getters.constellation(meta.id)" />
		</div>
		<div>
			{{ meta.name + (role ? ` as ${role}` : '') }}
		</div>
	</div>
	<div v-else :class="{ wrapper: true, suggestion: true }">
		<img :src="src" class="portrait">
		<div class="character-tags">
			<Element :meta="null"/>
			<Constellation :level="null" />
		</div>
		<div>
			Character
		</div>
	</div>
</template>

<script>
	import Element from './Element.vue'
	import Constellation from './Constellation.vue'

	export default {
		name: 'Character',
		props: ['meta', 'role', 'suggestion'],
		components: {
			Element,
			Constellation
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
		margin-top: -4.85rem;
		margin-left: -4.65rem;
		margin-bottom: 1rem;
	}

	.portrait {
		height: 4.5rem;
		width: 4.5rem;
		border-radius: 5%;
		border: 0.15em solid grey;
		margin: 0.5em;
	}

	.yellow {
		border-color: yellow;
	}

	.purple {
		border-color: darkviolet;
	}

	.suggestion {
		/*opacity: 0.75;*/
		filter: grayscale(75%); 
	}
</style>
