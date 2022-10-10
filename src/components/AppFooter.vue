<template>
	<footer>
		<span>
			<template v-if="json.version">
				<span>Data v{{ json.version }}</span>
				●
			</template>
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
		bottom: 1em;
		display: flex;
		font-size: 0.9rem;
		gap: 1em;
		grid-row: 3;
		justify-content: space-evenly;
		justify-self: center;
		text-align: left;
		width: calc(100vw - 1em);

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
