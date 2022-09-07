<template>
	<main>
		<p>
			These are the parties that you've created. Click a party or create a
			new one to edit it.
		</p>
		<PartyRow
			:clickable="true"
			:key="i"
			:meta="party"
			@click="() => editParty(i)"
			v-for="(party, i) in userData.parties"
		/>
		<button @click="createParty">New party</button>
		<button @click="prevStage">Characters</button>
	</main>
</template>

<script setup>
	import { onMounted } from "vue"
	import { useHead } from "@vueuse/head"
	import { useJsonDataStore } from "@/stores/jsonData"
	import { useRouter } from "vue-router"
	import { useUserDataStore } from "@/stores/userData"
	import PartyRow from "@/components/PartyRow"

	useHead({ title: `My parties | ${process.env.VUE_APP_SITE_NAME}` })

	const jsonData = useJsonDataStore()
	jsonData.sync()

	const router = useRouter()
	const userData = useUserDataStore()

	if (Object.keys(userData.ownedCharacters).length < 5) {
		router.push({ name: "landing" })
	}

	function prevStage() {
		router.push({ name: "characters" })
	}

	function editParty(index) {
		router.push({ name: "partyByilder", params: { index } })
	}

	function createParty() {
		editParty(userData.createParty())
	}

	onMounted(() => userData.parties.length < 1 && createParty())
</script>
