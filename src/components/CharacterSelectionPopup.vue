<template>
	<PopupShell
		:showAccept="false"
		@cancel="emit('close')"
		headline="Select specific character"
	>
		<div class="options-wrapper">
			Sort by:
			<SelectButton v-model="sortBy" :options="sortingOptions" />
		</div>
		<div id="available-characters">
			<CharacterCard
				:characterId="id"
				:cursor="'pointer'"
				:key="id"
				@click="emit('select', id)"
				v-for="id in characterIds"
			/>
		</div>
	</PopupShell>
</template>

<script setup>
	import { CharacterCard, PopupShell, SelectButton } from "@/components"
	import { computed, ref, onBeforeUnmount } from "vue"
	import { sortingOptions, useCharacterIdList } from "@/hooks"
	import { useUserDataStore } from "@/stores"

	const emit = defineEmits(["close", "select"])
	const props = defineProps({ meta: Object, exclude: Array })
	const userData = useUserDataStore()

	const sortBy = ref(sortingOptions[0].value)
	const allCharacterIds = useCharacterIdList(sortBy)
	const characterIds = computed(() => (allCharacterIds.value).filter(id => (
		Object.keys(userData.ownedCharacters).includes(id) && !props.exclude.includes(id)
	)))

	function hotkeyHandler({ key }) {
		if (["Enter", "Escape"].includes(key)) {
			emit("close")
		}
	}

	window.addEventListener("keydown", hotkeyHandler)
	onBeforeUnmount(() => {
		window.removeEventListener("keydown", hotkeyHandler)
	})
</script>

<style scoped>
	#available-characters {
		background-color: #4b5367;
		border-radius: 0.5em;
		box-sizing: border-box;
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, 5rem);
		max-height: 50vh;
		max-width: min(60rem, 100vw);
		overflow-y: auto;
		padding: 0.5rem;
	}

	.options-wrapper {
		align-self: flex-end;
		background-color: #4b5367;
		border-radius: 0.5em;
		color: #e5e1dc;
		margin: 0;
		padding: 0.5em;
	}
</style>
