<template>
	<div class="backdrop" @click="backdropClickHandler"></div>
	<div id="character-selection-dialogue">
		<Character v-for="char in characters" :key="char" :characterID="char" :clickable="true" />
		<Character :clickable="true" />
	</div>
</template>

<script>
	import Character from './Character.vue'

	export default {
		components: {
			Character,
		},
		props: ['meta'],
		methods: {
			backdropClickHandler() {
				window.mitt.emit('character-selection-dialogue-backdrop-clicked')
			},
		},
		computed: {
			characters() {
				return Object.keys(this.$store.getters.characters).sort()
			},
		}
	}
</script>

<style>
	.backdrop {
		background-color: #0007;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	#character-selection-dialogue {
		position: fixed;
		background-color: #21252b;
		top: 10vh;
		left: 20vw;
		max-width: 60vw;
		padding: 2em;
		border-radius: 0.5em;
		display: flex;
		flex-flow: wrap;
		gap: 1em;
		justify-content: center;
	}
</style>
