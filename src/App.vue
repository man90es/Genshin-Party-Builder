<template>
	<site-logo :full="shouldShowFullLogo"/>
	<router-view />
	<footer>
		<a href="https://github.com/octoman90/Genshin-Party-Builder" target="_blank">Give project a star on GitHub!</a>
	</footer>
</template>

<script setup>
	import { computed } from "vue"
	import { useRoute } from "vue-router"

	import SiteLogo from "@/components/SiteLogo.vue"

	const route = useRoute()

	const shouldShowFullLogo = computed(() => {
		return route.name === "landing"
	})
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

	footer {
		font-size: 0.9rem;
		position: fixed;
		right: 1em;
		bottom: 1em;

		a {
			opacity: 0.7;
			color: inherit;
			text-decoration: none;

			&:hover {
				opacity: 1;
				text-decoration: underline;
			}
		}
	}
</style>
