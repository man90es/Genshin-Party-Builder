<template>
	<div :class="{ hidden: !constellation }">
		{{ constellation }}
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useUserDataStore } from "@/stores"

	const userData = useUserDataStore()

	const props = defineProps({
		characterId: { type: String },
	})

	const constellation = computed(() => (
		userData.ownedCharacters[props.characterId]?.constellation
	))
</script>

<style scoped>
	div {
		background-color: #0007;
		border-bottom-left-radius: 0.5em;
		color: #fff;
		font: 0.7rem Hoyofont;
		height: 1rem;
		padding: 0.1rem;
		position: absolute;
		right: 0;
		text-align: center;
		width: 1rem;
		z-index: 1;
	}

	div.hidden {
		display: none;
	}
</style>
