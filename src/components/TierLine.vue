<template>
	<div class="leaderboard-line" :data-tier="tier" v-if="0 < characters.length">
		<CharacterCard
			:characterId="character.id"
			:clickable="false"
			:owned="character.owned"
			v-for="character of characters" :key="character.id"
		/>
	</div>
</template>

<script setup>
	import { CharacterCard } from "@/components"

	defineProps({
		tier: { type: String, required: true },
		characters: { type: Array, required: true },
	})
</script>

<style scoped>
	.leaderboard-line {
		background-color: #fff1;
		border-radius: 0.25rem;
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, 5rem);
		margin: 0.25rem 0;
		padding: 0.5rem 0.5rem 0.5rem 6.5rem;
		position: relative;
		min-height: 2.5rem;
	}

	.leaderboard-line::before {
		align-items: center;
		content: attr(data-tier);
		display: flex;
		font: 500 2rem Hoyofont;
		height: 100%;
		justify-content: center;
		left: 0.5rem;
		position: absolute;
		width: 5rem;
	}
</style>
