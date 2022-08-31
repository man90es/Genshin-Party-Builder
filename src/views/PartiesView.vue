<template>
	<main>
		<p>
			These are the parties that you've created. Click a party or create a
			new one to edit it.
		</p>
		<party-row
			:clickable="true"
			:key="i"
			:meta="party"
			@click="() => editParty(i)"
			v-for="(party, i) in userData.parties"
		/>
		<button @click="pushParty">New party</button>
		<button @click="prevStage">Characters</button>
	</main>
</template>

<script setup>
	import { useAPI } from "@/hooks/api"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useUserDataStore } from "@/stores/userData"
	import PartyRow from "@/components/PartyRow.vue"

	const { fetchData } = useAPI()
	useHead({ title: `My parties | ${process.env.VUE_APP_SITE_NAME}` })

	fetchData()

	const router = useRouter()
	const userData = useUserDataStore()

	if (Object.keys(userData.ownedCharacters).length < 5) {
		router.push({ name: "landing" })
	}

	function pushParty() {
		const emptyI = userData.parties.findIndex((p) => {
			return (
				p.members.reduce((s, m) => {
					return s + Number(m === null)
				}, 0) === 4
			)
		})

		if (emptyI > -1) {
			editParty(emptyI)
		} else {
			userData.createParty()
			editParty(userData.parties.length - 1)
		}
	}

	if (userData.parties.length < 1) {
		pushParty()
	}

	function prevStage() {
		router.push({ name: "characters" })
	}

	function editParty(index) {
		router.push({ name: "partyByilder", params: { index } })
	}
</script>
