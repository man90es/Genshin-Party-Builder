<template>
	<footer>
		<span>Man90's Party Builder is not affiliated with or endorsed by miHoYo.</span>
		<a href="https://github.com/octoman90/Genshin-Party-Builder" target="_blank">Give project a star on GitHub!</a>
	</footer>
</template>

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
