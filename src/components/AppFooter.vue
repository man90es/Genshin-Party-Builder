<template>
	<footer>
		<template v-if="jsonData.version">
			<span>Data v{{ jsonData.version }}</span>
		</template>
		<a href="https://www.hemlo.cc/finances#donate" target="_blank">Donate</a>
		<a href="https://github.com/man90es/Genshin-Party-Builder" target="_blank">GitHub</a>
		<span>Man90's Genshin Party Builder is not affiliated with or endorsed by miHoYo.</span>
	</footer>
</template>

<script setup lang="ts">
	import { useJsonDataStore } from "@/stores"

	const jsonData = useJsonDataStore()
</script>

<style>
	footer {
		display: grid;
		font-size: 0.9rem;
		gap: 0.5rem;
		grid-template-columns: repeat(3, auto);
		margin: 1rem auto;
		max-width: 30rem;
		text-align: center;

		& * {
			min-width: 5rem;
			opacity: 0.7;
		}

		& a {
			color: inherit;
			text-decoration: underline;

			&:hover {
				opacity: 1;
			}
		}

		& :last-child {
			grid-column: 1/-1;
		}
	}
</style>
