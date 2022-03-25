<template>
	<main>
		<p>
			First, select as many characters that you own as possible by clicking their portraits.
		</p>
		<p>
			After selecting at least 5 characters, click the button at the bottom of the page to continue to party creation. You may return to this step anytime later.
		</p>
		<div id="character-pool">
			<div v-for="char in characters" :key="char" :class="{ owned: store.state.ownedCharacters[char] !== undefined }">
				<character-card :characterId="char" @click="() => selectCharacter(char)" :cursor="'pointer'" />
				<div class="constellation-overlay">C{{ store.getters.constellation(char) }}</div>
			</div>
		</div>
		<button @click="nextStage" v-if="shouldShowNextButton">Next</button>
	</main>
	<constellation-dialogue v-if="lastAdded" :characterId="lastAdded" @abort="removeLastAdded" />
</template>

<script setup>
	import { ref, computed, onBeforeUnmount } from "vue"
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"

	import useAPI from "@/hooks/api"

	import CharacterCard from "@/components/CharacterCard.vue"
	import ConstellationDialogue from "@/components/ConstellationDialogue.vue"

	const router = useRouter()
	const store = useStore()

	const { fetchData } = useAPI()

	fetchData()

	const lastAdded = ref(null)

	const characters = computed(() => {
		return store.state.data.characters.map(c => c.id)
	})

	const shouldShowNextButton = computed(() => {
		return Object.keys(store.state.ownedCharacters).length >= 5
	})

	function nextStage() {
		router.push({ name: "parties" })
	}

	function selectCharacter(characterId) {
		lastAdded.value = characterId
	}

	function removeLastAdded() {
		lastAdded.value = null
	}

	function hotkeyHandler(e) {
		if (lastAdded.value !== null) return

		if (shouldShowNextButton.value) {
			if (e.key === "Enter" || e.key === "Escape") {
				nextStage()
			}
		}
	}

	window.addEventListener("keydown", hotkeyHandler)

	onBeforeUnmount(() => {
		window.removeEventListener("keydown", hotkeyHandler)
	})
</script>

<style lang="scss" scoped>
	main {
		#character-pool {
			margin: 1em 0;
			display: flex;
			flex-flow: wrap;
			gap: 1em;
			justify-content: center;

			& > div {
				position: relative;

				&:not(.owned) {
					filter: saturate(0.25);

					.constellation-overlay {
						display: none;
					}
				}

				.constellation-overlay {
					background-color: var(--button-background-color);
					pointer-events: none;
					z-index: 5;

					position: absolute;
					bottom: 1.3rem;
					height: 1em;
					width: 5rem;
					padding: 0.25em 0;

					color: var(--button-font-color);
					font-family: Hoyofont;
					font-size: 0.8rem;
					text-align: center;
				}
			}
		}
	}
</style>
