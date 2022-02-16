<template>
	<div class="overlay">
		<div class="backdrop" @click="closeHandler"></div>
		<div id="character-selection-dialogue">
			<character-card v-for="id in characterIds" :key="id" :characterId="id" :cursor="'pointer'" @click="select(id)" />
			<character-card :cursor="'pointer'" @click="closeHandler" />
		</div>
	</div>
</template>

<script setup>
	import { computed, defineProps, defineEmits } from "vue"
	import { useStore } from "vuex"
	import CharacterCard from "@/components/CharacterCard.vue"

	const store = useStore()

	const props = defineProps({ meta: Object, exclude: Array })
	const emit = defineEmits(["close", "select"])

	const characterIds = computed(() => {
		return store.state.data.characters
			.filter(c => c.id in store.getters.characters)
			.filter(c => !props.exclude.includes(c.id))
			.map(c => c.id)
	})

	function closeHandler() {
		emit("close")
	}

	function select(id) {
		emit("select", id)
	}
</script>

<style>
	.overlay, .backdrop {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
	}

	.overlay {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.backdrop {
		background-color: #0007;
		cursor: pointer;
	}

	#character-selection-dialogue {
		background-color: #21252b;
		border-radius: 0.5em;
		display: flex;
		flex-flow: wrap;
		gap: 1em;
		justify-content: center;
		box-sizing: border-box;
		padding: 4em 1em;
		max-height: 90vh;
		max-width: 100vw;
		overflow-y: auto;
	}
</style>
