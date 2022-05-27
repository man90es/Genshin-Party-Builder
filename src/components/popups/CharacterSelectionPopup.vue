<template>
	<popup-shell headline="Select another character">
		<div id="available-characters">
			<character-card v-for="id in characterIds" :key="id" :characterId="id" :cursor="'pointer'" @click="select(id)" />
			<character-card :cursor="'pointer'" @click="closeHandler" />
		</div>
	</popup-shell>
</template>

<script setup>
	import { computed, defineProps, defineEmits, onBeforeUnmount } from "vue"
	import { useStore } from "vuex"
	import CharacterCard from "@/components/CharacterCard.vue"
	import PopupShell from "../PopupShell.vue"

	const store = useStore()

	const props = defineProps({ meta: Object, exclude: Array })
	const emit = defineEmits(["close", "select"])

	const characterIds = computed(() => {
		return store.state.data.characters
			.filter(c => c.id in store.state.ownedCharacters)
			.filter(c => !props.exclude.includes(c.id))
			.map(c => c.id)
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
		border-radius: 0.5em;
		box-sizing: border-box;
		display: flex;
		flex-flow: wrap;
		gap: 1em;
		justify-content: center;
		max-height: 90vh;
		max-width: 90vw;
		overflow-y: auto;
	}
</style>
