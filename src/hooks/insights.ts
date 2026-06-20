import _capitalise from "lodash/capitalize"
import _difference from "lodash/difference"
import { computed } from "vue"
import { useJsonDataStore, useUserDataStore } from "@/stores"
import { useRoute } from "vue-router"

const reactionRequirements: any = {
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
	lunar_charged: {
		elements: [["hydro", "electro"]],
		enabledBy: ["ineffa", "flins", "columbina"],
	},
	lunar_bloom: {
		elements: [["hydro", "dendro"]],
		enabledBy: ["nefer", "lauma", "columbina"],
	},
	lunar_crystallize: {
		elements: [["hydro", "geo"]],
		enabledBy: ["linnea", "zibai", "columbina"],
	},
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
		const partyNames = party.value

		const list = Object.entries(reactionRequirements as Record<string, any>)
			.flatMap(([name, def]) => {
				// Backward compatibility: old reactions are still arrays
				const elements = Array.isArray(def) ? def : def.elements
				const enabledBy = Array.isArray(def) ? null : def.enabledBy

				// Check element match
				const hasElements = elements
					.map((o: string[]) => _difference(o, partyElements).length === 0)
					.includes(true)

				if (!hasElements) return []

				// If it requires an enabler, check that too
				if (enabledBy) {
					const hasEnabler = enabledBy.some((c: string) => partyNames.includes(c))
					if (!hasEnabler) return []
				}

				return [name.split("_").map(_capitalise).join(" ")]
			})

		return list.length ? list : ["None"]
	})

	const resonances = computed(() => {
		if (!party.value) {
			return []
		}

		const partyElements = party.value.map((c: string) => jsonData.characters[c!]?.element)

		const list = Object.entries(partyElements.reduce((prev, cur) => ({
			...prev,
			[cur]: prev[cur] ? prev[cur] + 1 : 1
		}), {} as { [key: string]: number }))
			.flatMap(([element, n]) => n > 1 ? [_capitalise(element)] : [])

		return list.length ? list : ["4 unique"]
	})

	return { reactions, resonances }
}
