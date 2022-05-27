<template>
	<main>
		<p v-if="isEmpty">
			This party has no characters yet. Start by picking a {{ suggested[0] }} from suggested choices below.
		</p>
		<p v-else-if="isFull">
			Your team is ready to hit the ground running! To change any character, click his or her portrait.
		</p>
		<p v-else>
			{{ reassurance }}! Now, it's suggested that you add a {{ suggested[0] }}. You can remove a character that is already in the party by clicking his or her portrait.
		</p>
		<party-row :meta="party" @cardClick="removeMember" :cardCursor="'removeOrDefault'" />
		<p v-if="!isFull">
			The AI recommends that you pick one of these {{ suggested[0] }}s to strengthen your team:
		</p>
		<section id="sugestions" v-if="!isFull">
			<character-card v-for="(cId, pos) in suggested[1]" :key="pos" :characterId="cId" @click="chooseCharacter(cId)" :cursor="'pointer'" />
			<character-card @click="chooseAnotherCharacter" :namePlaceholder="'More...'" :alternativeCursor="true" :cursor="'pointer'" />
		</section>
		<button v-if="store.state.parties.length > 1" @click="disband">Disband</button>
		<button @click="prevStage">Back</button>
		<character-selection-popup v-if="'characters' === activePopup.type" :exclude="party.members" @close="closePopup" @select="chooseCharacter" />
	</main>
</template>

<script setup>
	import { ref, computed, onBeforeUnmount } from "vue"
	import { useRouter, useRoute } from "vue-router"
	import { useStore } from "vuex"
	import CharacterCard from "@/components/CharacterCard.vue"
	import CharacterSelectionPopup from "@/components/popups/CharacterSelectionPopup.vue"
	import PartyRow from "@/components/PartyRow.vue"
	import useAPI from "@/hooks/api"
	import useRandomReassurance from "@/hooks/randomReassurance"
	import useSuggest from "@/hooks/suggest"

	const { fetchData } = useAPI()
	const { suggest } = useSuggest()
	const { generateReassurance } = useRandomReassurance()

	fetchData()

	const route = useRoute()
	const router = useRouter()
	const store = useStore()

	const activePopup = ref({ type: null, data: null })
	const reassurance = ref(generateReassurance())

	if (!store.state.parties[route.params.index]) {
		prevStage()
	}

	if (Object.keys(store.state.ownedCharacters).length < 5) {
		router.push({ name: "landing" })
	}

	const party = computed(() => {
		return store.state.parties[route.params.index] || { members: [null, null, null, null] }
	})

	const isEmpty = computed(() => {
		return party.value.members.reduce((empty, c) => empty + Number(c === null), 0) == 4
	})

	const isFull = computed(() => {
		return !party.value.members?.includes(null)
	})

	const suggested = computed(() => {
		if (store.state.parties[route.params.index]) {
			return suggest(route.params.index, 3)
		}

		return ["", []]
	})

	function chooseCharacter(cId) {
		activePopup.value = { type: null }
		store.commit("setPartyMember", { pI: route.params.index, cI: party.value.members.indexOf(null), cId })
		reassurance.value = generateReassurance()
	}

	function chooseAnotherCharacter() {
		activePopup.value = { type: "characters" }
	}

	function prevStage() {
		router.push({ name: "parties" })
	}

	function disband() {
		store.commit("deleteParty", route.params.index)
		prevStage()
	}

	function removeMember(cI) {
		store.commit("setPartyMember", { pI: route.params.index, cI, cId: null })
	}

	function hotkeyHandler(e) {
		if (null !== activePopup.value.type) return

		switch (e.key) {
			case "Delete":
				store.state.parties.length > 1 ? disband() : prevStage()
				break

			case "Escape":
				prevStage()
				break
		}
	}

	function closePopup() {
		activePopup.value = { type: null }
	}

	window.addEventListener("keydown", hotkeyHandler)

	onBeforeUnmount(() => {
		window.removeEventListener("keydown", hotkeyHandler)
	})
</script>

<style>
	#sugestions {
		display: flex;
		gap: 1em;
		justify-content: center;
	}
</style>
