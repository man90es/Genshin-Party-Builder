<template>
	<PopupShell
		@accept="fileInput.click()"
		@cancel="emit('abort')"
		acceptText="Browse"
		headline="Import characters"
	>
		<p>
			You can import your characters from a JSON file in GOOD format. You
			can generate it automatically with
			<a
				href="https://github.com/Andrewthe13th/Inventory_Kamera"
				rel="noreferrer noopener"
				target="_blank"
			>
				Inventory Kamera
			</a>
			or a similar tool.
		</p>
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
	import { PopupShell } from "@/components"
	import { readGOOD } from "@/utils"
	import { ref } from "vue"
	import { useUserDataStore } from "@/stores"

	const emit = defineEmits(["abort"])
	const error = ref("")
	const fileInput = ref(null)
	const userData = useUserDataStore()

	function handleImport() {
		readGOOD(fileInput.value?.files[0])
			.then(({ characters }) => {
				userData.importGOOD(characters)
				emit("abort")
			})
			.catch((err) => {
				error.value = err
			})
	}
</script>

<style scoped>
	.error {
		color: brown;
	}

	p {
		max-width: min(30em, 95vw);
	}
</style>
