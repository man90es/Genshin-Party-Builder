<template>
	<div>
		<Character :meta="character" />
		<div class="inputs">
			<Checkbox :clickHandler="toggleHave" :value="character.id in $store.getters.characters" />
			<ConstellationInput :value="($store.state[character.id] || {constellation: 0}).constellation" :incrementHandler="incrementHandler" :decrementHandler="decrementHandler" />
		</div>
	</div>
</template>

<script>
	import Character from './Character.vue'
	import Checkbox from './Checkbox.vue'
	import ConstellationInput from './ConstellationInput.vue'

	export default {
		name: 'SelectionRow',
		props: ['character'],
		components: {
			Character,
			Checkbox,
			ConstellationInput
		},
		methods: {
			incrementHandler(event) {
				this.$store.commit('updateConstellation', { id: this.character.id, value: 1 })
				window.mitt.emit('characters-updated')
			},

			decrementHandler(event) {
				this.$store.commit('updateConstellation', { id: this.character.id, value: -1 })
				window.mitt.emit('characters-updated')
			},

			toggleHave(event) {
				this.$store.commit('toggleHave', { id: this.character.id })
				window.mitt.emit('characters-updated')
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
		margin-bottom: 1.6em;
		gap: 0.5em;
	}
</style>
