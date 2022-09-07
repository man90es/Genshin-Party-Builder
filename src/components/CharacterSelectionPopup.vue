<template>
	<PopupShell
		:showAccept="false"
		@cancel="emit('close')"
		headline="Select another character"
	>
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
	import { computed, onBeforeUnmount } from "vue"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "@/components/CharacterCard"
	import PopupShell from "@/components/PopupShell"

	const emit = defineEmits(["close", "select"])
	const props = defineProps({ meta: Object, exclude: Array })
	const userData = useUserDataStore()

	const characterIds = computed(() =>
		Object.keys(userData.ownedCharacters).filter(
			(id) => !props.exclude.includes(id)
		)
	)

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

<style>
	#available-characters {
		background-color: #4b5367;
		border-radius: 0.5em;
		box-sizing: border-box;
		display: flex;
		flex-flow: wrap;
		gap: 1em;
		justify-content: center;
		max-height: 50vh;
		max-width: 90vw;
		overflow-y: auto;
		padding: 1em;
	}
</style>
