<template>
	<SiteHeader />
	<RouterView />
	<AppFooter />
	<BackgroundLayer />
</template>

<script setup>
	import AppFooter from "@/components/AppFooter"
	import BackgroundLayer from "@/components/BackgroundLayer"
	import SiteHeader from "@/components/SiteHeader"
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
