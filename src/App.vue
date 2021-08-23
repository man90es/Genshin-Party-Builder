<template>
	<div class="main-column">
		<SelectionRow v-for="char in characters" :key="char" :characterID="char" />
	</div>
	<div class="main-column">
		<header>
			<h1>Genshin Party Builder</h1>
			<ul>
				<li>Select your owned characters and their constellation levels in the left part of the screen.</li>
				<li>The algorithm will recommend you an optimal party in the right part of the screen.</li>
				<li>Each party has a DPS in the first slot, then two supports/sub-DPS and a healer</li>
				<li>Click a party member's portrait to select a specific character; the algorithm will adapt to your choice.</li>
			</ul>
		</header>
		<PartyRow v-for="(party, i) in parties" :key="i" :meta="party" :index="i" />
		<button id="add-party-button" @click="pushParty">Add party</button>
	</div>
	<footer><a href="https://github.com/octoman90/Genshin-Party-Builder" target="_blank">Give project a star on GitHub!</a></footer>
	<CharacterSelectionDialogue v-if="characterSelectorData" :meta="characterSelectorData" />
</template>

<script setup>
	import { computed } from "vue"
	import { useStore } from "vuex"

	import SelectionRow from "./components/SelectionRow.vue"
	import PartyRow from "./components/PartyRow.vue"
	import CharacterSelectionDialogue from "./components/CharacterSelectionDialogue.vue"

	import useCharacterSelectorEventHandler from "./hooks/characterSelectorEventHandler.js"
	import { ALL_CHARACTERS } from "./assets/data.js"
	import suggestParty from "./calculator.js"

	const store = useStore()

	const characters = Object.keys(ALL_CHARACTERS)
	const { characterSelectorData } = useCharacterSelectorEventHandler()
	const parties = computed(() => {
		return store.getters.parties
			.map((storedParty) => {
				return {
					name: storedParty.name,
					defined: storedParty.members,
					suggestion: suggestParty(storedParty.members, store.getters.characters)
				}
			})
	})

	function pushParty() {
		store.commit("pushParty")
	}
</script>

<style lang="scss">
	#app {
		--button-background-color: #ece5d8;
		--button-font-color: #3b4255;

		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		display: grid;
		grid-template-columns: 1fr 1fr;
		color: #fafafa;
		background-image: url(./assets/background.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		padding: 2em;
	}

	header {
		h1 {
			color: #d3bc8e;
			text-align: left;
			margin: 0;
			font-size: 1.8em;
		}

		ul {
			text-align: left;
			font-size: 1.3em;
			padding-left: 1.5rem;
			list-style: square url(./assets/bullet.png);
		}
	}

	.main-column {
		&:nth-child(1) {
			display: flex;
			flex-flow: wrap;
			gap: 1em 3em;
		}

		&:nth-child(2) {
			position: sticky;
			top: 0;
			right: 0;
		}
	}

	#add-party-button {
		display: block;
		float: right;
		padding: 0 1.5em 0 0.5em;
		height: 2em;
		background-color: var(--button-background-color);
		color: var(--button-font-color);
		border: none;
		border-radius: 2em;
		font-size: 1.5rem;
		outline: none;
		cursor: pointer;

		&::before {
			content: "+";
			background-color: #313131;
			color: #ffcb32;
			border-radius: 50%;
			padding: 0 0.25em;
			margin-right: 1em;
		}
	}

	footer {
		position: fixed;
		right: 1em;
		bottom: 1em;

		a {
			color: inherit;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
