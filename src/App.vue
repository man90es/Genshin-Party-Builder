<template>
	<SiteHeader />
	<RouterView />
	<AppFooter />
	<BackgroundLayer />
</template>

<script setup>
	import { AppFooter, BackgroundLayer, SiteHeader } from "@/components"
	import { useJsonDataStore } from "@/stores"

	const jsonData = useJsonDataStore()
	jsonData.sync()
</script>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		text-align: justify;
		width: 100vmin;

		p {
			margin: 0.5em;
		}
	}
</style>
