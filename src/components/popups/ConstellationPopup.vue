<template>
	<popup-shell :headline="`At what constellation level is ${characterName}?`">
		<div class="row">
			<button @click="dec">-1</button>
			<div class="result">
				Constellation: {{ store.getters.constellation(props.characterId) }}
			</div>
			<button @click="inc">+1</button>
		</div>
		<div class="row">
			<button @click="cancel">Remove</button>
			<button @click="accept">Accept</button>
		</div>
	</popup-shell>
</template>

<script setup>
	import { defineProps, computed, defineEmits, onBeforeUnmount } from "vue"
	import { useStore } from "vuex"
	import PopupShell from "../PopupShell.vue"

	const emit = defineEmits(["abort"])
	const props = defineProps({
		characterId: String
	})
	const store = useStore()

	const characterName = computed(() => {
		return store.state.data.characters.find(char => char.id === props.characterId)?.name
	})

	store.commit("setHave", { id: props.characterId, have: true })

	function inc() {
		store.commit("updateConstellation", { id: props.characterId, value: 1 })
	}

	function dec() {
		store.commit("updateConstellation", { id: props.characterId, value: -1 })
	}

	function cancel() {
		store.commit("setHave", { id: props.characterId, have: false })
		emit("abort")
	}

	function accept() {
		emit("abort")
	}

	function hotkeyHandler(e) {
		const parsedInt = parseInt(e.key)
		if (!isNaN(parsedInt)) {
			const delta = parsedInt - store.getters.constellation(props.characterId)
			store.commit("updateConstellation", { id: props.characterId, value: delta })

			return
		}

		switch (e.key) {
			case "Escape":
				cancel()
				break

			case "Enter":
				accept()
				break

			case "=":
			case "+":
				inc()
				break

			case "-":
			case "_":
				dec()
				break
		}
	}

	addEventListener("keydown", hotkeyHandler)
	onBeforeUnmount(() => removeEventListener("keydown", hotkeyHandler))
</script>

<style scoped>
	.row {
		display: flex;
		justify-content: center;
		gap: 1em;
	}

	.result {
		font-size: 1.5em;
		padding: 0.5em 0;
	}
</style>
