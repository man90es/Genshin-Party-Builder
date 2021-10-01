<template>
	<div class="selection-row">
		<Character :characterID="characterID" />
		<div class="inputs">
			<Checkbox :clickHandler="toggleHave" :value="characterID in $store.getters.characters" />
			<ConstellationInput :value="($store.getters.characters[characterID] || {constellation: 0}).constellation" :incrementHandler="incrementHandler" :decrementHandler="decrementHandler" />
		</div>
	</div>
</template>

<script>
	import Character from './Character.vue'
	import Checkbox from './Checkbox.vue'
	import ConstellationInput from './ConstellationInput.vue'

	export default {
		props: ['characterID'],
		components: {
			Character,
			Checkbox,
			ConstellationInput
		},
		methods: {
			incrementHandler() {
				this.$store.commit('updateConstellation', { id: this.characterID, value: 1 })
			},

			decrementHandler() {
				this.$store.commit('updateConstellation', { id: this.characterID, value: -1 })
			},

			toggleHave() {
				this.$store.commit('toggleHave', { id: this.characterID })
			}
		}
	}
</script>

<style scoped>
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
</style>
