<template>
	<main>
		<p>
			This is the list of parties that you've created. Click one of them to to edit it.
		</p>
		<party-row v-for="(party, i) in store.getters.parties" :key="i" :meta="party" @click="() => editParty(i)" />
		<button @click="pushParty">New party</button>
		<button @click="prevStage">Characters</button>
	</main>
</template>

<script setup>
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"

	import useAPI from "@/hooks/api.js"
	import PartyRow from "@/components/PartyRow.vue"

	const { fetchData } = useAPI()

	fetchData()

	const router = useRouter()
	const store = useStore()

	if (Object.keys(store.state.ownedCharacters).length < 5) {
		router.push({ name: "landing" })
	}

	function pushParty() {
		const emptyI = store.getters.parties.findIndex(p => {
			return p.members.reduce((s, m) => {
				return s + Number(m === null)
			}, 0) === 4
		})

		if (emptyI > -1) {
			editParty(emptyI)
		} else {
			store.commit("pushParty")
			editParty(store.getters.parties.length - 1)
		}
	}

	if (store.getters.parties.length < 1) {
		pushParty()
	}

	function prevStage() {
		router.push({ name: "characters" })
	}

	function editParty(index) {
		router.push({ name: "partyByilder", params: { index } })
	}
</script>
