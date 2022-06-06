<template>
	<popup-shell :headline="`Select ${characterName}'s contellation level`" @cancel="cancel" @accept="accept" cancelText="Remove">
		<span>Contellation level</span>
		<div class="row" id="contellation-row">
			<button class="dark" @click="dec">-</button>
			<div class="result">{{ store.getters.constellation(props.characterId) }}</div>
			<button class="dark" @click="inc">+</button>
		</div>
	</popup-shell>
</template>

<script setup>
	import { characterIdToName } from "@/utils"
	import { computed, onBeforeUnmount } from "vue"
	import { useStore } from "vuex"
	import PopupShell from "../PopupShell.vue"

	const emit = defineEmits(["abort"])
	const props = defineProps({ characterId: String })
	const store = useStore()

	const characterName = computed(() => {
		return store.state.data.characters[props.characterId]?.name || characterIdToName(props.characterId)
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

<style lang="scss" scoped>
	.result {
		font-size: 1.5em;
		padding: 0.5em 0;
	}

	#contellation-row {
		align-items: center;
		background-color: #f8f8f6;
		border-radius: 10em;
		border: 0.2em solid #e5e1dc;
		box-shadow: 0 0 0.5em #f8f8f6;
		height: 2.75em;
		justify-content: space-between;
		width: 50%;

		button {
			height: 1.5em;
			margin: 0.2em;
			will-change: 1.5em;
		}
	}
</style>
