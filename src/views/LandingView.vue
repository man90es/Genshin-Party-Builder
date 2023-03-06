<template>
	<main>
		<p>{{ strings.welcome1 }}</p>
		<p>{{ strings.pressStart }}</p>
		<div class="button-wrapper">
			<button @click="nextStage">Start</button>
		</div>
	</main>
</template>

<script setup>
	import { onBeforeUnmount } from "vue"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useStrings } from "@/hooks/strings"
	import { useUserDataStore } from "@/stores/userData"

	const router = useRouter()
	const strings = useStrings()
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
