<template>
	<main>
		<p>
			Select your {{ suggested[0] }}.
		</p>
		<party-row :meta="party" @cardClick="removeMember" :alternativeCursor="true"/>
		<p>
			The AI recommends these choices:
		</p>
		<section id="sugestions" v-if="party.members?.includes(null)">
			<character-card v-for="(cId, pos) in suggested[1]" :key="pos" :characterId="cId" @click="chooseCharacter(cId)" />
		</section>
		<button v-if="store.state.parties.length > 1" @click="deleteParty">Remove party</button>
		<button @click="prevStage">Back</button>
	</main>
</template>

<script setup>
	import { computed } from "vue"
	import { useRouter, useRoute } from "vue-router"
	import { useStore } from "vuex"

	import CharacterCard from "@/components/CharacterCard.vue"
	import PartyRow from "@/components/PartyRow.vue"
	import useAPI from "@/hooks/api.js"
	import useSuggest from "@/hooks/suggest.js"

	const { fetchData } = useAPI()
	const { suggest } = useSuggest()

	fetchData()

	const route = useRoute()
	const router = useRouter()
	const store = useStore()

	if (Object.keys(store.state.ownedCharacters).length < 5) {
		router.push({ name: "landing" })
	}

	const party = computed(() => {
		return store.state.parties[route.params.index] || { members: [null, null, null, null] }
	})

	const suggested = computed(() => {
		return suggest(route.params.index, 3)
	})

	function chooseCharacter(cId) {
		store.commit("setPartyMember", { pI: route.params.index, cI: party.value.members.indexOf(null), cId })
	}

	function prevStage() {
		router.push({ name: "parties" })
	}

	function deleteParty() {
		store.commit("deleteParty", route.params.index)
		prevStage()
	}

	function removeMember(cI) {
		store.commit("setPartyMember", { pI: route.params.index, cI, cId: null })
	}
</script>

<style>
	#sugestions {
		display: flex;
		gap: 1em;
		justify-content: center;
	}
</style>
