<template>
	<main>
		<p>
			Welcome to an AI-assisted team creation tool for Genshin Impact. It helps beginners to assemble well-rounded teams no matter how many or which characters they have.
		</p>
		<p>
			Press start to select your characters.
		</p>
		<button @click="nextStage">Start</button>
	</main>
</template>

<script setup>
	import { useRouter } from "vue-router"

	const router = useRouter()

	function nextStage() {
		router.push({ name: "characters" })
	}
</script>

<style lang="scss">
	main {
		width: 100vmin;
		display: flex;
		flex-direction: column;
		text-align: justify;
		margin: 1em;

		p {
			margin: 0.5em 20vmin;
		}

		button {
			margin: 1em 30vmin;
		}
	}
</style>
