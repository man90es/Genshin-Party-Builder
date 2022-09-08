<template>
	<div :style="{ cursor: clickable ? 'pointer' : 'default' }" class="wrapper">
		<div v-if="showName">
			{{ meta?.name || `Party ${1 + index}` }}
		</div>
		<div class="row">
			<CharacterCard
				:characterId="meta.members[pos]"
				:clickable="hoverRemove ? Boolean(meta.members[pos]) : true"
				:hoverIntention="
					hoverRemove && meta.members[pos] ? 'remove' : 'pick'
				"
				:key="meta.members[pos]"
				@click="emit('cardClick', pos)"
				v-for="pos in [0, 1, 2, 3]"
			/>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "./CharacterCard"

	const emit = defineEmits(["cardClick"])
	const props = defineProps({
		clickable: Boolean,
		hoverRemove: { default: false, type: Boolean },
		index: Number,
		showName: { default: true, type: Boolean },
	})

	const store = useUserDataStore()
	const meta = computed(() => store.parties[props.index])
</script>

<style scoped>
	.wrapper {
		display: grid;
		text-align: center;
		gap: 0.5em;
	}
</style>
