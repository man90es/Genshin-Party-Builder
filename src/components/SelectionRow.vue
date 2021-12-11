<template>
	<div class="selection-row">
		<CharacterCard :characterID="characterID" />
		<div class="inputs">
			<OwnedCheckbox :clickHandler="toggleHave" :value="characterID in $store.getters.characters" />
			<ConstellationInput :value="($store.getters.characters[characterID] || {constellation: 0}).constellation" :incrementHandler="incrementHandler" :decrementHandler="decrementHandler" />
		</div>
	</div>
</template>

<script>
	import CharacterCard from './CharacterCard.vue'
	import OwnedCheckbox from './OwnedCheckbox.vue'
	import ConstellationInput from './ConstellationInput.vue'

	export default {
		props: ['characterID'],
		components: {
			CharacterCard,
			OwnedCheckbox,
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
