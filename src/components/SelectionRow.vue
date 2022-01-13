<template>
	<div class="selection-row">
		<character-card :characterID="characterID" />
		<div class="inputs">
			<owned-checkbox :clickHandler="toggle" :value="characterID in $store.getters.characters" />
			<div class="constellation-input">
				<button @click="dec">-</button>
					C{{ constellation }}
				<button @click="inc">+</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, computed } from "vue"
	import { useStore } from "vuex"

	import CharacterCard from "@/components/CharacterCard.vue"
	import OwnedCheckbox from "@/components/OwnedCheckbox.vue"

	const { characterID } = defineProps(["characterID"]) // eslint-disable-line
	const store = useStore()

	const constellation = computed(() => store.getters.characters[characterID]?.constellation || 0)

	const inc = () => store.commit("updateConstellation", { id: characterID, value: 1 })
	const dec = () => store.commit("updateConstellation", { id: characterID, value: -1 })
	const toggle = () => store.commit("toggleHave", { id: characterID })
</script>

<style lang="scss" scoped>
	.selection-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.constellation-input {
		display: flex;

		img {
			height: 2em;
			width: 2em;
			cursor: pointer;
		}

		button {
			border: none;
			outline: none;
			background-color: var(--button-background-color);
			color: var(--button-font-color);
			margin: 0 0.5em;
			height: 1.5em;
			width: 1.5em;
			font-weight: bold;
			border-radius: 50%;
			cursor: pointer;
		}
	}
</style>
