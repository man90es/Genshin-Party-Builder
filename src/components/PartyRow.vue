<template>
	<div class="party-row" :style="{ cursor: clickable ? 'pointer' : 'default' }">
		<character-card
			:characterId="meta.members[pos]"
			:clickable="hoverRemove ? Boolean(meta.members[pos]) : true"
			:hoverIntention="(hoverRemove && meta.members[pos]) ? 'remove' : 'pick'"
			:key="meta.members[pos]"
			@click="() => emit('cardClick', pos)"
			v-for="pos in [0, 1, 2, 3]"
		/>
	</div>
</template>

<script setup>
	import CharacterCard from "./CharacterCard.vue"

	const emit = defineEmits(["cardClick"])
	defineProps({
		clickable: Boolean,
		hoverRemove: { default: false, type: Boolean },
		meta: Object,
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
