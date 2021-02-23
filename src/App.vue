<template>
	<div class="main_column characterter_selection">
		<SelectionRow v-for="character in characters" :key="character.id" :character="character" />
	</div>
	<div class="main_column">
		<PartyRow v-for="(party, i) in parties" :key="i" :meta="party" :number="i" />
	</div>
</template>

<script>
	import SelectionRow from './components/SelectionRow.vue'
	import PartyRow from './components/PartyRow.vue'
	import { ALL_CHARACTERS } from './assets/data.js'
	import suggestParty from './calculator.js'

	export default {
		name: 'App',
		data() {
			return {
				characters: ALL_CHARACTERS.sort((a, b) => a.name > b.name ? 1 : -1),
				parties: [
					{
						defined: [null, null, null, null], 
						suggestion: [null, null, null, null]
					}
				]
			}
		},
		components: {
			SelectionRow,
			PartyRow
		},
		methods: {
			calculateParties() {
				this.parties = this.parties.map((party) => {
					return {
						defined: party.defined,
						suggestion: suggestParty(party.defined, this.$store.getters.characters)
					}
				})
			}
		},
		created() {
			this.calculateParties()

			window.mitt.on('characters-updated', this.calculateParties)
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		background-color: #21252b;
		color: #bbc;
	}

	.main_column {
		padding: 2em;
		min-height: 100vh;
	}

	.characterter_selection {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
</style>
