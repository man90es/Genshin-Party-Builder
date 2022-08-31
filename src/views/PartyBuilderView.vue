<template>
	<main>
		<p v-if="isEmpty">
			This party has no characters yet. Start by picking a character from
			suggested choices below.
		</p>
		<p v-else-if="isFull">
			Your team is ready to hit the ground running! To change any
			character, click his or her portrait.
		</p>
		<p v-else>
			{{ reassurance }}! You can add up to 4 characters to the party. You
			can remove a character from the party by clicking his or her
			portrait.
		</p>
		<party-row
			:hoverRemove="true"
			:meta="party"
			@cardClick="removeMember"
		/>
		<p v-if="!isFull">
			The AI recommends that you pick one of these characters to
			strengthen your team:
		</p>
		<section id="sugestions" v-if="!isFull">
			<CharacterCard
				:characterId="cId"
				:key="pos"
				@click="chooseCharacter(cId)"
				v-for="(cId, pos) in suggested"
			/>
			<CharacterCard
				:alternativeCursor="true"
				:namePlaceholder="'More...'"
				@click="chooseAnotherCharacter"
			/>
		</section>
		<button v-if="userData.parties.length > 1" @click="disband">
			Disband
		</button>
		<button @click="prevStage">Back</button>
		<CharacterSelectionPopup
			:exclude="party.members"
			@close="closePopup"
			@select="chooseCharacter"
			v-if="'characters' === activePopup.type"
		/>
	</main>
</template>

<script setup>
	import { ref, computed, onBeforeUnmount } from "vue"
	import { useAPI } from "@/hooks/api"
	import { useHead } from "@vueuse/head"
	import { useRouter, useRoute } from "vue-router"
	import { useSuggest } from "@/hooks/suggest"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "@/components/CharacterCard"
	import CharacterSelectionPopup from "@/components/popups/CharacterSelectionPopup"
	import PartyRow from "@/components/PartyRow"
	import useRandomReassurance from "@/hooks/randomReassurance"

	const { fetchData } = useAPI()
	const { suggest } = useSuggest()
	const { generateReassurance } = useRandomReassurance()
	useHead({ title: `Edit party | ${process.env.VUE_APP_SITE_NAME}` })

	fetchData()

	const route = useRoute()
	const router = useRouter()
	const userData = useUserDataStore()

	const activePopup = ref({ type: null, data: null })
	const reassurance = ref(generateReassurance())

	if (!userData.parties[route.params.index]) {
		prevStage()
	}

	if (Object.keys(userData.ownedCharacters).length < 5) {
		router.push({ name: "landing" })
	}

	const party = computed(
		() =>
			userData.parties[route.params.index] || {
				members: [null, null, null, null],
			}
	)

	const isEmpty = computed(() => {
		return (
			party.value.members.reduce(
				(empty, c) => empty + Number(c === null),
				0
			) == 4
		)
	})

	const isFull = computed(() => {
		return !party.value.members?.includes(null)
	})

	const suggested = computed(() => {
		if (userData.parties[route.params.index]) {
			return suggest(parseInt(route.params.index), 3)
		}

		return []
	})

	function chooseCharacter(cId) {
		activePopup.value = { type: null }
		userData.setPartyMember(
			route.params.index,
			party.value.members.indexOf(null),
			cId
		)
		reassurance.value = generateReassurance()
	}

	function chooseAnotherCharacter() {
		activePopup.value = { type: "characters" }
	}

	function prevStage() {
		router.push({ name: "parties" })
	}

	function disband() {
		userData.disbandParty(route.params.index)
		prevStage()
	}

	function removeMember(cI) {
		userData.setPartyMember(route.params.index, cI, null)
	}

	function hotkeyHandler(e) {
		if (null !== activePopup.value.type) return

		switch (e.key) {
			case "Delete":
				userData.parties.length > 1 ? disband() : prevStage()
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
