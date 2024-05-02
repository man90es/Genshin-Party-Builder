<template>
	<main>
		<p>{{ strings.characterScreenInstruction }}</p>
		<div class="button-wrapper">
			<button @click="() => activePopup = { type: 'import' }">
				Import
			</button>
		</div>
		<div class="options-wrapper">
			Sort by:
			<SelectButton v-model="sortBy" :options="sortingOptions" />
		</div>
		<div id="character-pool">
			<CharacterCard :clickable="true" :characterId="char" :cursor="'pointer'" :key="char" :notCollected="!userData.ownedCharacters[char]" @click="() => selectCharacter(char)" v-for="char in characters" />
		</div>
	</main>
	<ImportPopup v-if="'import' === activePopup.type" @abort="closePopup" />
	<ConstellationPopup :characterId="activePopup.data" @abort="closePopup" v-else-if="'constellation' === activePopup.type" />
</template>

<script setup>
	import { CharacterCard, ConstellationPopup, ImportPopup, SelectButton } from "@/components"
	import { ref, onBeforeUnmount } from "vue"
	import { sortingOptions, useCharacterIdList, useStrings } from "@/hooks"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useUserDataStore } from "@/stores"

	const router = useRouter()
	const strings = useStrings()
	const userData = useUserDataStore()
	useHead({ title: `My characters | ${process.env.VUE_APP_SITE_NAME}` })

	const activePopup = ref({ type: null, data: null })

	const sortBy = ref(sortingOptions[0].value)
	const characters = useCharacterIdList(sortBy)

	function selectCharacter(characterId) {
		activePopup.value = { type: "constellation", data: characterId }
	}

	function closePopup() {
		activePopup.value = { type: null }
	}

	function hotkeyHandler(e) {
		if (null !== activePopup.value.type) {
			return
		}

		if (!userData.enoughCharacters) {
			return
		}

		if (e.key === "Enter" || e.key === "Escape") {
			router.push({ name: "parties" })
		}
	}

	window.addEventListener("keydown", hotkeyHandler)
	onBeforeUnmount(() => {
		window.removeEventListener("keydown", hotkeyHandler)
	})
</script>

<style scoped>
	#character-pool {
		display: grid;
		gap: 0.5em;
		grid-template-columns: repeat(auto-fit, 5rem);
		margin: 0.5em;
	}

	.options-wrapper {
		margin-bottom: 0;
	}
</style>
