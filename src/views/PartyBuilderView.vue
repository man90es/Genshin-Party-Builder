<template>
	<main>
		<p>
			Edit your party.
		</p>
		<party-row :meta="party" />
		<button v-if="store.state.parties.length > 1" @click="deleteParty">Remove party</button>
		<button @click="prevStage">Back</button>
	</main>
</template>

<script setup>
	import { computed } from "vue"
	import { useRouter, useRoute } from "vue-router"
	import { useStore } from "vuex"

	import useAPI from "@/hooks/api.js"
	import PartyRow from "@/components/PartyRow.vue"

	const { fetchData } = useAPI()

	fetchData()

	const route = useRoute()
	const router = useRouter()
	const store = useStore()

	const party = computed(() => {
		return store.state.parties[route.params.index] || [null, null, null, null]
	})

	function prevStage() {
		router.push({ name: "parties" })
	}

	function deleteParty() {
		store.commit("deleteParty", route.params.index)
		prevStage()
	}
</script>
