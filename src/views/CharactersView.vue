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
	import { ref, computed, onBeforeUnmount } from "vue"
	import { useHead } from "@vueuse/head"
	import { useJsonDataStore } from "@/stores/jsonData"
	import { useRouter } from "vue-router"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "@/components/CharacterCard"
	import ConstellationPopup from "@/components/ConstellationPopup"
	import ImportPopup from "@/components/ImportPopup"

	const jsonData = useJsonDataStore()
	const router = useRouter()
	const userData = useUserDataStore()
	useHead({ title: `My characters | ${process.env.VUE_APP_SITE_NAME}` })

	const activePopup = ref({ type: null, data: null })

	const characters = computed(() => Object.keys(jsonData.characters))

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
		display: flex;
		flex-flow: wrap;
		gap: 0.5em;
		margin: 0.5em;
		width: inherit;
	}
</style>
