<template>
	<div class="leaderboard-line">
		<div class="tier-letter">{{tier}}</div>
		<div class="characters-wrapper">
			<CharacterCard
				:characterId="character.id"
				:clickable="false"
				:owned="character.owned"
				v-for="character of characters" :key="character.id"
			/>
		</div>
	</div>
</template>

<script setup>
	import CharacterCard from "@/components/CharacterCard"

	defineProps({
		tier: { type: String, required: true },
		characters: { type: Array, required: true },
	})
</script>

<style scoped lang="scss">
	.leaderboard-line {
		background-color: #fff1;
		border-radius: 0.25em;
		display: grid;
		gap: 1em;
		grid-template-columns: 5em 1fr;
		margin: 0.25em 0;
		padding: 0.5em;
	}

	.tier-letter {
		align-items: center;
		display: flex;
		font-family: Hoyofont;
		font-size: 2em;
		font-weight: 500;
		justify-content: center;
	}

	.characters-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}
</style>
