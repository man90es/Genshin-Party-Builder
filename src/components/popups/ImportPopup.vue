<template>
	<PopupShell
		@accept="accept"
		@cancel="cancel"
		acceptText="Browse"
		headline="Import characters"
	>
		<span>
			You can import your characters from a JSON file in GOOD format. You
			can generate it automatically with
			<a
				href="https://github.com/Andrewthe13th/Inventory_Kamera"
				target="_blank"
			>
				Inventory Kamera
			</a>
			or a similar tool.
		</span>
		<span class="error">{{ error }}</span>
		<input
			@change="handleImport"
			accept="application/json"
			hidden
			ref="fileInput"
			type="file"
		/>
	</PopupShell>
</template>

<script setup>
	import { ref } from "vue"
	import { useUserDataStore } from "@/stores/userData"
	import PopupShell from "../PopupShell.vue"

	const emit = defineEmits(["abort"])
	const userData = useUserDataStore()

	const error = ref("")
	const fileInput = ref(null)

	const errors = {
		badFormat: "Selected file is in a wrong format.",
		noCharacters: "Selected file has no characters data.",
	}

	function cancel() {
		emit("abort")
	}

	function accept() {
		fileInput.value.click()
	}

	function handleImport() {
		const file = fileInput.value?.files[0]
		const reader = new FileReader()

		if ("application/json" !== file?.type) {
			error.value = errors.badFormat
			return
		}

		reader.onload = (e) => {
			const data = JSON.parse(e.target.result)

			if ("GOOD" !== data.format || 1 !== data.version) {
				error.value = errors.badFormat
				return
			}

			if (!data.characters) {
				error.value = errors.noCharacters
				return
			}

			userData.importGOOD(data.characters)
			emit("abort")
		}

		reader.readAsText(fileInput.value?.files[0])
	}
</script>

<style scoped>
	.error {
		color: brown;
	}

	span {
		max-width: 30em;
	}
</style>
