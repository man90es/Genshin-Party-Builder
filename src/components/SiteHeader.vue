<template>
	<header data-nosnippet>
		<h1>Man90's Party Builder<sup>v2</sup></h1>
		<div v-if="full">for</div>
		<img v-if="full" :src="logoSrc" alt="Genshin Impact" />
		<nav v-else>
			<RouterLink to="/my-characters">Characters</RouterLink>
			<RouterLink to="/my-parties">Parties</RouterLink>
			<RouterLink to="/tier-list">Tier list</RouterLink>
		</nav>
	</header>
</template>

<script lang="ts" setup>
	import { computed } from "vue"
	import { useRoute } from "vue-router"

	const route = useRoute()
	const full = computed(() => "landing" === route.name)
	const logoSrc = `${process.env.VUE_APP_ASSETS_ENDPOINT}GI-logo.svg`
</script>

<style scoped lang="scss">
	header {
		align-items: center;
		display: flex;
		flex-direction: column;
		font-family: Hoyofont;
		justify-content: space-between;
		overflow: hidden;

		h1 {
			font-size: 1.2rem;
			margin-bottom: 0;
		}

		sup {
			color: #faad14;
		}

		img {
			height: 3em;
			filter: invert(1);
		}
	}

	nav {
		--border-radius: 2rem;

		display: flex;
		gap: 0.2em;
		max-width: calc(100vw - 1em);

		a {
			background-color: var(--button-background-color);
			border: 0.05em solid transparent;
			color: var(--button-font-color);
			display: block;
			font-size: 1.2rem;
			padding: 0.5rem;
			transition-duration: 0.2s;
			width: 8em;

			&.router-link-active {
				border-color: #060d1f;
				filter: brightness(0.9);
			}

			&:first-child {
				border-radius: var(--border-radius) 0 0 var(--border-radius);
			}

			&:last-child {
				border-radius: 0 var(--border-radius) var(--border-radius) 0;
			}

			&:not(:first-child):not(:last-child) {
				border-left: none;
				border-right: none;
			}
		}
	}
</style>
