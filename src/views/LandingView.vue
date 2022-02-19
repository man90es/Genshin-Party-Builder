<template>
	<main>
		<p>
			Welcome to an AI-assisted party creation tool for Genshin Impact. It helps beginners to assemble well-rounded teams no matter how many or which characters they have.
		</p>
		<p>
			Press start to select your characters.
		</p>
		<button @click="nextStage">Start</button>
	</main>
</template>

<script setup>
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"

	const router = useRouter()
	const store = useStore()

	if (Object.keys(store.state.ownedCharacters).length >= 5) {
		router.push({ name: "parties" })
	}

	function nextStage() {
		router.push({ name: "characters" })
	}
</script>

<style scoped>
	main {
		margin-top: 5em;
	}
</style>
