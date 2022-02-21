<template>
	<header data-nosnippet>
		<h1>Man90's Party Builder</h1>
		<div v-if="props.full">for</div>
		<img v-if="props.full" src="@/assets/Genshin_Impact_logo.svg" alt="Genshin Impact">
	</header>
</template>

<script setup>
	import { defineProps } from "vue"

	const props = defineProps({
		full: Boolean
	})
</script>

<style lang="scss">
	header {
		font-family: Hoyofont;

		h1 {
			font-size: 1.2rem;
			margin-bottom: 0;
		}

		img {
			height: 3em;
			filter: invert(1);
		}
	}
</style>
