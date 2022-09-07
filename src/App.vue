<template>
	<SiteLogo :full="'landing' === $route.name" />
	<RouterView />
	<AppFooter />
	<BackgroundLayer />
</template>

<script setup>
	import AppFooter from "@/components/AppFooter"
	import BackgroundLayer from "@/components/BackgroundLayer"
	import SiteLogo from "@/components/SiteLogo"
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
