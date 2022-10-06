<template>
	<main>
		<p>
			Welcome to an AI-assisted team creation tool for Genshin Impact.
			It helps beginners to assemble well-rounded teams no matter how
			many or which characters they have.
		</p>
		<p>Press start to select your characters.</p>
		<div class="button-wrapper">
			<button @click="nextStage">Start</button>
		</div>
	</main>
</template>

<script setup>
	import { onBeforeUnmount } from "vue"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useUserDataStore } from "@/stores/userData"

	const router = useRouter()
	const userData = useUserDataStore()
	useHead({ title: process.env.VUE_APP_SITE_NAME })

	if (Object.keys(userData.ownedCharacters).length >= 5) {
		router.push({ name: "parties" })
	}

	function nextStage() {
		router.push({ name: "characters" })
	}

	function hotkeyHandler(e) {
		"Enter" === e.key && nextStage()
	}

	window.addEventListener("keydown", hotkeyHandler)
	onBeforeUnmount(() => {
		window.removeEventListener("keydown", hotkeyHandler)
	})
</script>

<style scoped>
	main {
		margin-top: 6em;
	}
</style>
