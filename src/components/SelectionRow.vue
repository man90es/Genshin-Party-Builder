<template>
	<div>
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
		name: 'SelectionRow',
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
	div {
		display: flex;
	}

	.inputs {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 2em;
		gap: 0.5em;
	}
</style>
