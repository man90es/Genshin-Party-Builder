<template>
	<main>
		<p>
			Import or manually select your owned characters and
			switch to parties or leaderboard tab once you're done.
			You may return to this step anytime later.
		</p>
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
			<CharacterCard
				:characterId="char"
				:cursor="'pointer'"
				:key="char"
				:owned="Boolean(userData.ownedCharacters[char])"
				@click="() => selectCharacter(char)"
				v-for="char in characters"
			/>
		</div>
	</main>
	<ImportPopup v-if="'import' === activePopup.type" @abort="closePopup" />
	<ConstellationPopup
		:characterId="activePopup.data"
		@abort="closePopup"
		v-else-if="'constellation' === activePopup.type"
	/>
</template>

<script setup>
	import { ref, onBeforeUnmount } from "vue"
	import { sortingOptions, useCharacterIdList } from "@/hooks/characterIdList"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "@/components/CharacterCard"
	import ConstellationPopup from "@/components/ConstellationPopup"
	import ImportPopup from "@/components/ImportPopup"
	import SelectButton from "@/components/SelectButton"

	const router = useRouter()
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
		width: inherit;
	}

	.options-wrapper {
		margin-bottom: 0;
	}
</style>
