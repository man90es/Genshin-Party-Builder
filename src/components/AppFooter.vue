<template>
	<footer>
		<span>
			<span>Data v{{ json.version }}</span>
			●
			<span>
				Man90's Party Builder is not affiliated with or endorsed by
				miHoYo.
			</span>
		</span>
		<span>
			<a href="https://donate.hemlo.cc" target="_blank">Donate</a>
			●
			<a
				href="https://github.com/octoman90/Genshin-Party-Builder"
				rel="noreferrer noopener"
				target="_blank"
			>
				GitHub
			</a>
		</span>
	</footer>
</template>

<script setup>
	import { useJsonDataStore } from "@/stores/jsonData"
	const json = useJsonDataStore()
</script>

<style lang="scss">
	footer {
		font-size: 0.9rem;
		text-align: left;
		bottom: 1em;
		width: 100vw;
		display: flex;
		justify-content: space-evenly;
		gap: 1em;
		grid-row: 3;

		span {
			display: flex;
			gap: 1em;
		}

		& > * {
			opacity: 0.7;
		}

		a {
			color: inherit;

			&:hover {
				opacity: 1;
			}
		}
	}
</style>
