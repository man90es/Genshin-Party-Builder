<template>
	<site-logo :full="shouldShowFullLogo"/>
	<router-view />
	<app-footer />
</template>

<script setup>
	import { computed } from "vue"
	import { useRoute } from "vue-router"

	import useLoadBackground from "@/hooks/loadBackground.js"

	import SiteLogo from "@/components/SiteLogo.vue"
	import AppFooter from "./components/AppFooter.vue"

	const route = useRoute()
	useLoadBackground()

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
		margin: 1em auto;

		p {
			margin: 0.5em 10vmin;
		}

		button {
			margin: 1em 25vmin;
		}
	}
</style>
