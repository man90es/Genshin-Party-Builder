import _difference from "lodash/difference"
import _intersection from "lodash/intersection"
import _shuffle from "lodash/shuffle"
import _sum from "lodash/sum"
import _uniq from "lodash/uniq"
import { computed } from "vue"
import { useJsonDataStore, useUserDataStore } from "@/stores"
import { useRoute } from "vue-router"
import type { Character, ProcessedCharacter, Preset, JSONData } from "@/types"

function processCharacter(id: string, character: Character, constellation: number): ProcessedCharacter {
	return {
		constellation,
		damage: character.damage || [character.element],
		element: character.element,
		id,
		roles: character.roles.flatMap(r => (
			"object" === typeof r
				? constellation >= r.c ? [r.role] : []
				: [r]
		)),
		score: character.score[constellation],
		shortId: character.id,
		weapon: character.weapon,
	}
}

function getFitness(character: ProcessedCharacter, currentParty: ProcessedCharacter[], data: JSONData, presets: Preset[]) {
	const partyElements = _uniq(currentParty.map(c => c.element))
	const partyRoles = _uniq(currentParty.map(c => c.roles).flat())
	const scores = []

	// Start with points from the tier list
	scores.push(character.score / 3)

	// If party doesn't have a DPS, give all DPS characters points
	// Else subtract points from all DPS characters
	scores.push(character.roles.includes("dps")
		? partyRoles.includes("dps")
			? -1
			: 1
		: 0
	)

	// Give points for role variability
	scores.push(_difference(character.roles, partyRoles).length / 4)

	// Subtract points for having the same weapon type as other characters in party
	scores.push(-currentParty.filter(c => character.weapon === c.weapon).length / 6)

	// Add points for potential to create new resonance (except for useless 4-unique resonance)
	scores.push(Number(1 === currentParty.filter(c => character.element === c.element).length))

	// Get a multiplier from a triangular matrix
	// Where a value represents the strength of reaction of a pair of elements
	// And sum all reactions possible in current team
	scores.push(
		partyElements.reduce((acc, cur) => {
			const idxs = [cur, character.element].map(e => data.reactions.header.indexOf(e))
			return acc + data.reactions.matrix[Math.max(...idxs)][Math.min(...idxs)]
		}, 0) / 2
	)

	// Add points for character being present in presets with other characters in party
	if (presets.length) {
		scores.push(presets.filter(p => p.includes(character.shortId)).length / presets.length * 3)
	} else {
		scores.push(0)
	}

	const finalScore = _sum(scores)

	// Debug messages
	if ("development" === process.env.NODE_ENV) {
		const categories = [
			"Tier list score",
			"Essential role (DPS)",
			"Essential role (Heal/Shield)",
			"Role variability",
			"Weapon variability",
			"Resonance potential",
			"Reactions strength",
			"Presets presence",
		]

		console.debug(
			"Considering",
			character.id,
			finalScore,
			Object.fromEntries(
				scores.map((score, i) => [categories[i], score])
			)
		)
	}

	return finalScore
}

export function useSuggested() {
	const jsonData = useJsonDataStore()
	const route = useRoute()
	const userData = useUserDataStore()

	const processedCharacters = computed(() => (
		Object.entries(jsonData.characters)
			// Not interested in characters that are not owned
			.filter(([id]) => id in userData.ownedCharacters)
			.flatMap(([id, character]) => (
				undefined !== character
					? [processCharacter(id, character, userData.ownedCharacters[id].constellation)]
					: []
			)))
	)

	function suggest(partyId: number, n: number) {
		const currentParty: (string | null)[] = userData.parties[partyId].members

		const selected = _uniq(
			currentParty
				.filter(Boolean)
				.flatMap((id) => {
					const found = processedCharacters.value.find(c => id === c.id)
					return found ? [found] : []
				})
		)

		const pool = processedCharacters.value
			.filter(({ id }) => !(currentParty.includes(id)))

		// Presets that include all currently selected characters
		const matchingPresets = selected.length
			? jsonData.presets.filter(preset => (
				_intersection(selected.map(c => c.shortId), preset).length === selected.length
			))
			: []

		return _shuffle(pool)
			.map(c => ({ characterId: c.id, fitness: getFitness(c, selected, jsonData, matchingPresets) }))
			.sort((a, b) => a.fitness < b.fitness ? 1 : -1)
			.slice(0, n)
			.map(f => f.characterId)
	}

	const suggested = computed(() => {
		const idx = Number(route.params.index)
		return userData.parties[idx] ? suggest(idx, 3) : []
	})

	return { suggested }
}
