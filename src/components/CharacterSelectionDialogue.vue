<template>
	<div class="backdrop" @click="backdropClickHandler"></div>
	<div id="character-selection-dialogue">
		<Character v-for="characterID in characterIDs" :key="characterID" :characterID="characterID" :clickable="true" />
		<Character :clickable="true" />
	</div>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"
	import Character from "./Character.vue"

	const store = useStore()

	defineProps({
		"meta": { type: Object }
	})

	const characterIDs = computed(() => {
		return store.state.data.characters
			.filter(c => c.id in store.getters.characters)
			.map(c => c.id)
	})

	function backdropClickHandler() {
		window.mitt.emit("character-selection-dialogue-backdrop-clicked")
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
