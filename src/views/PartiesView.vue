<template>
	<main>
		<div class="party-list">
			<PartyRow
				:clickable="true"
				:index="i"
				:key="i"
				@click="editParty(i)"
				v-for="(party, i) in userData.parties"
			/>
		</div>
		<div class="button-wrapper">
			<button @click="prevStage">Characters</button>
			<button @click="createParty">New party</button>
		</div>
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

<style scoped>
	main {
		margin-top: 1em;
	}

	.party-list {
		display: grid;
		gap: 1em;
	}
</style>
