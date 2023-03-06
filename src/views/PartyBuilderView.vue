<template>
	<main v-if="userData.enoughCharacters">
		<p v-if="isEmpty">
			Looks like {{ name }} is empty at the moment! To get started, you can either choose a character from the AI-suggested list below or select a specific character by clicking the "More..." button.
		</p>
		<p v-else-if="isFull">
			{{ name }} is ready to hit the ground running! If you need to make any changes to the lineup, click on a character's portrait to remove them from the party.
		</p>
		<p v-else>
			{{ reassurance }}! You can add up to four characters to {{ name }}. If you need to make any changes to the lineup, click on a character's portrait to remove them from the party.
		</p>
		<PartyRow
			:editableName="true"
			:hoverRemove="true"
			:index="Number(route.params.index)"
			@cardClick="removeMember"
		/>
		<section id="insights" v-if="!isEmpty">
			<div>
				Possible reactions:
				<div v-for="reaction in reactions" :key="reaction">{{ reaction }}</div>
			</div>
			<div>
				Resonances:
				<div v-for="resonance in resonances" :key="resonance">{{ resonance }}</div>
			</div>
		</section>
		<p v-if="!isFull">
			Current suggestions:
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
		<div class="button-wrapper">
			<button @click="prevStage">Back</button>
			<button v-if="userData.parties.length > 1" @click="disband">
				Disband
			</button>
		</div>
		<CharacterSelectionPopup
			:exclude="party.members"
			@close="closePopup"
			@select="chooseCharacter"
			v-if="'characters' === activePopup.type"
		/>
	</main>
</template>

<script setup>
	import { getRandomReassurance } from "@/utils"
	import { ref, computed, onBeforeUnmount } from "vue"
	import { useHead } from "@vueuse/head"
	import { useInsights } from "@/hooks/insights"
	import { useRouter, useRoute } from "vue-router"
	import { useSuggested } from "@/hooks/suggested"
	import { useUserDataStore } from "@/stores/userData"
	import CharacterCard from "@/components/CharacterCard"
	import CharacterSelectionPopup from "@/components/CharacterSelectionPopup"
	import PartyRow from "@/components/PartyRow"

	useHead({ title: `Edit party | ${process.env.VUE_APP_SITE_NAME}` })

	const { reactions, resonances } = useInsights()
	const { suggested } = useSuggested()
	const route = useRoute()
	const router = useRouter()
	const userData = useUserDataStore()

	const activePopup = ref({ type: null, data: null })
	const reassurance = ref(getRandomReassurance(true))

	if (!userData.parties[route.params.index]) {
		prevStage()
	}

	if (!userData.enoughCharacters) {
		prevStage()
	}

	const party = computed(() => (
		userData.parties[route.params.index] || {
			members: [null, null, null, null],
		}
	))

	const name = computed(() => (
		party.value.name || `Party ${Number(route.params.index) + 1}`
	))

	const isEmpty = computed(() => (
		party.value.members.reduce((empty, c) => empty + Number(c === null), 0) === 4
	))

	const isFull = computed(() => !party.value.members?.includes(null))

	function chooseCharacter(cId) {
		activePopup.value = { type: null }
		userData.setPartyMember(
			route.params.index,
			party.value.members.indexOf(null),
			cId
		)
		reassurance.value = getRandomReassurance(true)
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
		if (null !== activePopup.value.type) {
			return
		}

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

<style scoped lang="scss">
	#sugestions {
		display: flex;
		gap: 0.5em;
		justify-content: center;
		margin-top: 1em;
	}

	#insights {
		display: flex;
		gap: 1em;
		justify-content: center;
	}

	.button-wrapper {
		margin-top: 1em;
	}
</style>
