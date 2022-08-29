<template>
	<PopupShell
		:showAccept="false"
		@cancel="closeHandler"
		headline="Select another character"
	>
		<div id="available-characters">
			<CharacterCard
				:characterId="id"
				:cursor="'pointer'"
				:key="id"
				@click="select(id)"
				v-for="id in characterIds"
			/>
		</div>
	</PopupShell>
</template>

<script setup>
	import { computed, onBeforeUnmount } from "vue"
	import { useJsonDataStore } from "@/stores/jsonData"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "@/components/CharacterCard"
	import PopupShell from "@/components/PopupShell"

	const userData = useUserDataStore()
	const jsonData = useJsonDataStore()

	const emit = defineEmits(["close", "select"])
	const props = defineProps({ meta: Object, exclude: Array })

	const characterIds = computed(() =>
		Object.keys(jsonData.characters)
			.filter((id) => id in userData.ownedCharacters)
			.filter((id) => !props.exclude.includes(id))
	)

	function closeHandler() {
		emit("close")
	}

	function select(id) {
		emit("select", id)
	}

	function hotkeyHandler(e) {
		switch (e.key) {
			case "Enter":
			case "Escape":
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
