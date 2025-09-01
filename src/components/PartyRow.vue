<template>
	<div :style="{ cursor: clickable ? 'pointer' : 'default' }" class="wrapper" v-if="meta">
		<input :placeholder="namePlaceholder" type="text" v-if="editableName" v-model="store.parties[props.index].name" />
		<div class="name" v-else>
			{{ meta.name || namePlaceholder }}
			<time v-if="meta.updatedAt">({{ formatDistanceToNow(meta.updatedAt, { addSuffix: true }) }})</time>
		</div>
		<div class="row">
			<CharacterCard :characterId="meta.members[pos]" :clickable="hoverRemove ? Boolean(meta.members[pos]) : true" :hoverIntention="hoverRemove && meta.members[pos] ? 'remove' : 'pick'" :key="pos" @click="emit('cardClick', pos)" v-for="pos in [0, 1, 2, 3]" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { CharacterCard } from "@/components"
	import { computed } from "vue"
	import { formatDistanceToNow } from "date-fns"
	import { useUserDataStore } from "@/stores"

	const emit = defineEmits(["cardClick"])
	const props = defineProps<{
		clickable?: boolean
		editableName?: boolean
		hoverRemove?: boolean
		index: number
	}>()

	const store = useUserDataStore()
	const meta = computed(() => store.parties[props.index])
	const namePlaceholder = computed(() => `Party ${1 + props.index}`)
</script>

<style scoped>
	.wrapper {
		display: grid;
		gap: 0.5em;
		justify-content: center;
		text-align: center;
	}

	input {
		border-radius: 1em;
		border: none;
		margin: 0 5em;
		padding: 0.5em;
		text-align: center;
	}

	.row {
		background-color: #fff1;
		border-radius: 0.25em;
		gap: 0.5rem;
		padding: 0.5rem;
	}

	time {
		opacity: 0.5;
	}

	.name {
		font-family: Hoyofont;
		text-align: left;
	}
</style>
