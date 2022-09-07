<template>
	<PopupShell
		:headline="`Select ${characterName}'s contellation level`"
		@cancel="cancel"
		@accept="emit('abort')"
		cancelText="Remove"
	>
		<span>Contellation level</span>
		<div class="row" id="contellation-row">
			<button class="dark" @click="dec">-</button>
			<div class="result">
				{{ userData.ownedCharacters[props.characterId].constellation }}
			</div>
			<button class="dark" @click="inc">+</button>
		</div>
	</PopupShell>
</template>

<script setup>
	import { characterIdToName } from "@/utils"
	import { computed, onBeforeUnmount } from "vue"
	import { useJsonDataStore } from "@/stores/jsonData"
	import { useUserDataStore } from "@/stores/userData"
	import PopupShell from "@/components/PopupShell"

	const emit = defineEmits(["abort"])
	const jsonData = useJsonDataStore()
	const props = defineProps({ characterId: String })
	const userData = useUserDataStore()

	const characterName = computed(
		() =>
			jsonData.characters[props.characterId]?.name ||
			characterIdToName(props.characterId)
	)

	const curConstellation = computed(
		() => userData.ownedCharacters[props.characterId]?.constellation
	)

	const maxConstellation = computed(
		() => jsonData.characters[props.characterId].score.length - 1
	)

	function inc() {
		curConstellation.value < maxConstellation.value &&
			(userData.ownedCharacters[props.characterId].constellation += 1)
	}

	function dec() {
		0 < curConstellation.value &&
			(userData.ownedCharacters[props.characterId].constellation -= 1)
	}

	function cancel() {
		userData.setHave(props.characterId, false)
		emit("abort")
	}

	function hotkeyHandler({ key }) {
		const n = parseInt(key)
		if (!isNaN(n) && n <= maxConstellation.value) {
			userData.ownedCharacters[props.characterId].constellation = n
			return
		}

		switch (key) {
			case "Escape":
				cancel()
				break

			case "Enter":
				emit("abort")
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

	userData.setHave(props.characterId, true)
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
