<template>
	<header data-nosnippet>
		<h1>Man90's Party Builder<sup>v2</sup></h1>
		<div v-if="props.full">for</div>
		<img v-if="props.full" :src="logoSrc" alt="Genshin Impact">
	</header>
</template>

<script setup>
	const props = defineProps({ full: Boolean })
	const logoSrc = `${process.env.VUE_APP_ASSETS_ENDPOINT}GI-logo.svg`
</script>

<style lang="scss">
	header {
		font-family: Hoyofont;

		h1 {
			font-size: 1.2rem;
			margin-bottom: 0;
		}

		sup {
			color: #faad14
		}

		img {
			height: 3em;
			filter: invert(1);
		}
	}
</style>
