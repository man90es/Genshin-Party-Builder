<template>
	<footer>
		<template v-if="json.version">
			<span>Data v{{ json.version }}</span>
		</template>
		<a href="https://donate.hemlo.cc" target="_blank">Donate</a>
		<a
			href="https://github.com/octoman90/Genshin-Party-Builder"
			rel="noreferrer noopener"
			target="_blank"
		>
			GitHub
		</a>
		<span>{{ strings.notAffiliated }}</span>
	</footer>
</template>

<script setup>
	import { useJsonDataStore } from "@/stores"
	import { useStrings } from "@/hooks"

	const strings = useStrings()
	const json = useJsonDataStore()
</script>

<style lang="scss">
	footer {
		display: grid;
		font-size: 0.9rem;
		grid-template-columns: repeat(3, auto);
		max-width: 30rem;
		margin: 1rem auto;
		text-align: center;
		gap: 0.5rem;

		& > * {
			min-width: 5rem;
			opacity: 0.7;
		}

		a {
			color: inherit;
			text-decoration: underline;

			&:hover {
				opacity: 1;
			}
		}

		& > :last-child {
			grid-column: 1/-1;
		}
	}
</style>
