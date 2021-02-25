<template>
	<div class="main_column characterter_selection">
		<SelectionRow v-for="char in characters" :key="char" :characterID="char" />
	</div>
	<div class="main_column">
		<PartyRow v-for="(party, i) in parties" :key="i" :meta="party" :index="i" />
		<button id="add-party-button" @click="pushParty">Add party +</button>
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
				characters: Object.keys(ALL_CHARACTERS),
				characterSelectionDialogueData: null
			}
		},
		components: {
			SelectionRow,
			PartyRow,
			CharacterSelectionDialogue
		},
		methods: {
			pushParty() {
				this.$store.commit('pushParty')
			},

			characterClickHandler(data) {
				if (data.pIndex !== undefined && data.cIndex !== undefined) {
					this.characterSelectionDialogueData = data
				} else {
					this.$store.commit('setPartyMember', {
						pI: this.characterSelectionDialogueData.pIndex,
						cI: this.characterSelectionDialogueData.cIndex,
						cID: data.cID
					})

					this.closeCharacterSelectionDialogue()
				}
			},

			closeCharacterSelectionDialogue() {
				this.characterSelectionDialogueData = null
			}
		},
		computed: {
			parties() {
				let availableCharacters = this.$store.getters.characters

				return this.$store.getters.parties.map((storedParty) => {
					return {
						name: storedParty.name,
						defined: storedParty.members,
						suggestion: suggestParty(storedParty.members, availableCharacters)
					}
				})
			}
		},
		created() {
			window.mitt.on('character-clicked', this.characterClickHandler)
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
		grid-template-rows: repeat(auto-fit, 7.5rem);
	}

	#add-party-button {
		width: 100%;
		height: 2em;
		background-color: #0005;
		border: none;
		border-radius: 0.5rem;
		font-size: 1.5rem;
		color: #bbc;
		outline: none;
		cursor: pointer;
	}
</style>
