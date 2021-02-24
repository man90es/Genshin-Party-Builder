<template>
	<div class="main_column characterter_selection">
		<SelectionRow v-for="character in characters" :key="character.id" :character="character" />
	</div>
	<div class="main_column">
		<PartyRow v-for="(party, i) in parties" :key="i" :meta="party" :number="i" />
	</div>
	<CharacterSelectionDialogue v-if="characterSelectionDialogueData" :meta="characterSelectionDialogueData" />
</template>

<script>
	import SelectionRow from './components/SelectionRow.vue'
	import PartyRow from './components/PartyRow.vue'
	import CharacterSelectionDialogue from './components/CharacterSelectionDialogue.vue'
	import { ALL_CHARACTERS } from './assets/data.js'
	import suggestParty from './calculator.js'

	export default {
		name: 'App',
		data() {
			return {
				characters: Object.values(ALL_CHARACTERS).sort((a, b) => a.name > b.name ? 1 : -1),
				parties: [],
				characterSelectionDialogueData: null
			}
		},
		components: {
			SelectionRow,
			PartyRow,
			CharacterSelectionDialogue
		},
		methods: {
			calculateParties() {
				this.parties = this.parties.map((party) => {
					return {
						defined: party.defined,
						suggestion: suggestParty(party.defined, this.$store.getters.characters)
					}
				})
			},

			selectCharacterReplacement(data) {
				if (data.pIndex !== undefined && data.cIndex !== undefined) {
					this.characterSelectionDialogueData = data
				} else {
					let pI = this.characterSelectionDialogueData.pIndex
					let cI = this.characterSelectionDialogueData.cIndex
					this.parties[pI].defined[cI] = ALL_CHARACTERS[data.cID]

					this.calculateParties()
					this.closeCharacterSelectionDialogue()
				}
			},

			closeCharacterSelectionDialogue() {
				this.characterSelectionDialogueData = null
			}
		},
		created() {
			for (let i = 0; i < 4; ++i) {
				this.parties.push({
					defined: [null, null, null, null],
					suggestion: [null, null, null, null]
				})
			}

			this.calculateParties()

			window.mitt.on('characters-updated', this.calculateParties)
			window.mitt.on('character-clicked', this.selectCharacterReplacement)
			window.mitt.on('character-selection-dialogue-backdrop-clicked', this.closeCharacterSelectionDialogue)
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
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
	}
</style>
