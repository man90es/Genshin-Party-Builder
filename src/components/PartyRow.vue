<template>
	<div class="party-row">
		<character-card v-for="pos in [0, 1, 2, 3]" :key="meta.members[pos]" :characterId="meta.members[pos]" :alternativeCursor="alternativeCursor" @click="() => emit('cardClick', pos)" />
	</div>
</template>

<script setup>
	import { defineProps, defineEmits } from "vue"

	import CharacterCard from "./CharacterCard.vue"

	const emit = defineEmits(["cardClick"])
	defineProps({
		"meta": Object,
		"alternativeCursor": Boolean
	})
</script>

<style>
	.party-row {
		margin: 0.25rem;
		display: flex;
		justify-content: center;
		gap: 1em;
		background-color: #fff1;
		padding: 0.5rem;
		cursor: pointer;
	}
</style>
