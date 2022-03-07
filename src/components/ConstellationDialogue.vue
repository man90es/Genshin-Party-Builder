<template>
	<div id="dialogue-wrapper">
		<div id="constellation-dialogue">
			<h2>
				At what constellation level is {{ characterName }}?
			</h2>
			<div class="row">
				<button @click="dec">-1</button>
				<div class="result">
					Constellation: {{ store.getters.constellation(props.characterId) }}
				</div>
				<button @click="inc">+1</button>
			</div>
			<div class="row">
				<button @click="cancel">Remove</button>
				<button @click="accept">Accept</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, computed, defineEmits } from "vue"
	import { useStore } from "vuex"

	const emit = defineEmits(["abort"])
	const props = defineProps({
		characterId: String
	})
	const store = useStore()

	const characterName = computed(() => {
		return store.state.data.characters.find(char => char.id === props.characterId)?.name
	})

	store.commit("setHave", { id: props.characterId, have: true })

	function inc() {
		store.commit("updateConstellation", { id: props.characterId, value: 1 })
	}

	function dec() {
		store.commit("updateConstellation", { id: props.characterId, value: -1 })
	}

	function cancel() {
		store.commit("setHave", { id: props.characterId, have: false })
		emit("abort")
	}

	function accept() {
		emit("abort")
	}
</script>

<style lang="scss" scoped>
	#dialogue-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;

		background-color: #1117;
	}

	#constellation-dialogue {
		background-color: #1c1c1c;
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;
		border-radius: 0.5em;

		h2 {
			margin: 0;
		}
	}

	.row {
		display: flex;
		justify-content: center;
		gap: 1em;
	}

	.result {
		font-size: 1.5em;
		padding: 0.5em 0;
	}
</style>
