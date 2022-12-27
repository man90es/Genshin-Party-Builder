import _capitalise from "lodash/capitalize"
import _difference from "lodash/difference"
import { computed } from "vue"
import { useJsonDataStore } from "@/stores/jsonData"
import { useRoute } from "vue-router"
import { useUserDataStore } from "@/stores/userData"

const reactionRequirements: { [key: string]: string[][] } = {
	aggravate: [
		["dendro", "electro"],
	],
	bloom: [
		["dendro", "hydro"],
	],
	burgeon: [
		["hydro", "dendro", "pyro"],
	],
	burning: [
		["pyro", "dendro"],
	],
	crystallise: [
		["geo", "cryo"],
		["geo", "electro"],
		["geo", "hydro"],
		["geo", "pyro"],
	],
	electrocharged: [
		["electro", "hydro"],
	],
	frozen: [
		["hydro", "cryo"],
	],
	hyperbloom: [
		["hydro", "dendro", "electro"],
	],
	melt: [
		["pyro", "cryo"],
	],
	overloaded: [
		["pyro", "electro"],
	],
	quicken: [
		["dendro", "electro"],
	],
	spread: [
		["dendro", "electro"],
	],
	superconduct: [
		["cryo", "electro"],
	],
	swirl: [
		["anemo", "cryo"],
		["anemo", "electro"],
		["anemo", "hydro"],
		["anemo", "pyro"],
	],
	vaporise: [
		["hydro", "pyro"],
	],
}

export function useInsights() {
	const jsonData = useJsonDataStore()
	const route = useRoute()
	const userData = useUserDataStore()

	const party = computed(() => {
		const idx = Number(route.params.index)
		return userData.parties[idx].members.filter(Boolean) as string[]
	})

	const reactions = computed(() => {
		if (!party.value) {
			return []
		}

		const partyElements = party.value.map(c => jsonData.characters[c!]?.element)

		const list = Object.entries(reactionRequirements)
			.flatMap(([name, options]) => (
				options.map(o => _difference(o, partyElements).length === 0).includes(true)
					? [_capitalise(name)]
					: []
			))

		return list.length ? list : ["None"]
	})

	const resonances = computed(() => {
		if (!party.value) {
			return []
		}

		const partyElements = party.value.map(c => jsonData.characters[c!]?.element)

		const list = Object.entries(partyElements.reduce((prev, cur) => ({
			...prev,
			[cur]: prev[cur] ? prev[cur] + 1 : 1
		}), {} as { [key: string]: number }))
			.flatMap(([element, n]) => n > 1 ? [_capitalise(element)] : [])

		return list.length ? list : ["4 unique"]
	})

	return { reactions, resonances }
}
