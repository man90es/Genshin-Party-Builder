<template>
	<main>
		<template v-if="userData.enoughCharacters">
			<div class="party-list">
				<PartyRow :clickable="true" :index="i" :key="i" @click="editParty(i)" v-for="(_, i) in userData.parties" />
			</div>
			<div class="button-wrapper">
				<button @click="createParty">New party</button>
			</div>
		</template>
		<p v-else>{{ strings.teamsScreenNoCharacters }}</p>
	</main>
</template>

<script setup>
	import { onMounted } from "vue"
	import { PartyRow } from "@/components"
	import { useHead } from "@vueuse/head"
	import { useRouter } from "vue-router"
	import { useStrings } from "@/hooks"
	import { useUserDataStore } from "@/stores"

	useHead({ title: `My parties | ${process.env.VUE_APP_SITE_NAME}` })

	const router = useRouter()
	const strings = useStrings()
	const userData = useUserDataStore()

	function editParty(index) {
		router.push({ name: "partyByilder", params: { index } })
	}

	function createParty() {
		editParty(userData.createParty())
	}

	onMounted(() => {
		userData.parties.length < 1 && createParty()
	})
</script>

<style scoped>
	.party-list {
		display: grid;
		gap: 1em;
		margin: 1em 0;
	}
</style>
