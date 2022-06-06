<template>
	<popup-shell headline="Select another character" :showAccept="false" @cancel="closeHandler">
		<div id="available-characters">
			<character-card v-for="id in characterIds" :key="id" :characterId="id" :cursor="'pointer'" @click="select(id)" />
		</div>
	</popup-shell>
</template>

<script setup>
	import { computed, onBeforeUnmount } from "vue"
	import { useStore } from "vuex"
	import CharacterCard from "@/components/CharacterCard.vue"
	import PopupShell from "../PopupShell.vue"

	const store = useStore()

	const emit = defineEmits(["close", "select"])
	const props = defineProps({ meta: Object, exclude: Array })

	const characterIds = computed(() => {
		return Object.keys(store.state.data.characters)
			.filter(id => id in store.state.ownedCharacters)
			.filter(id => !props.exclude.includes(id))
	})

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
