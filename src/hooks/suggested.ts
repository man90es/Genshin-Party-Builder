import _difference from "lodash/difference"
import _intersection from "lodash/intersection"
import _shuffle from "lodash/shuffle"
import _sum from "lodash/sum"
import _uniq from "lodash/uniq"
import { computed } from "vue"
import { useJsonDataStore } from "@/stores/jsonData"
import { useRoute } from "vue-router"
import { useUserDataStore } from "@/stores/userData"
import type { Character, ProcessedCharacter, JSONData } from "@/types"

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
		weapon: character.weapon,
	}
}

function getCharacterCompatibility(currentParty: ProcessedCharacter[], character: ProcessedCharacter): number {
	return [...currentParty, character]
		.map((character, i, a) => {
			const party: ProcessedCharacter[] = a.filter((_, idx) => idx !== i)
			const partyElements = _uniq(party.map(c => c.element))
			const partyRoles = _uniq(party.map(c => c.roles).flat())

			switch (character.id) {
				case "bennett": {
					// C6 Bennett's ultimate overrides autoattack element with pyro
					// Subtract points for each character that gets negatively affected
					const badInteraction = [
						"chongyun", "eula", "kamisato_ayaka",
						"keqing", "razor"
					]

					if (5 < character.constellation) {
						return -_intersection(party.map(c => c.id), badInteraction).length
					}

					return 0
				}

				case "candace": {
					// Candace's ability overrides autoattack element with hydro
					// Subtract points for each character that gets negatively affected
					const badInteraction = [
						"chongyun", "eula", "kamisato_ayaka",
						"keqing", "razor", "rosaria"
					]

					return -_intersection(party.map(c => c.id), badInteraction).length
				}

				case "chongyun": {
					// Chongyun's ability overrides autoattack element with cryo
					// Subtract points for each character that gets negatively affected
					const badInteraction = [
						"eula", "keqing", "razor",
						"rosaria",
					]

					return -_intersection(party.map(c => c.id), badInteraction).length
				}

				case "gorou": {
					// Gorou wants mono-geo
					return party.filter(c => "geo" === c.element).length - 1
				}

				case "hu_tao": {
					// Hu Tao doesn't want healers
					return -partyRoles.includes("heal")
				}

				case "nilou": {
					// Nilou wants party that has at least 1 dendro character
					// and no non-hydro non-dendro characters
					const hasEmptySlots = 4 > party.length
					const hasDendro = 1 <= party.filter(c => "dendro" === c.element).length
					const hasBadElements = 0 === party.filter(c => !["dendro", "hydro"].includes(c.element)).length

					return -Number((hasEmptySlots || hasDendro) && !hasBadElements) * 2
				}

				case "yelan": {
					// When the party has 1/2/3/4 Elemental Types,
					// Yelan's Max HP is increased by 6%/12%/18%/30%.
					// And her skills scale off her HP
					return (partyElements.length + Number(!partyElements.includes("hydro"))) / 2
				}

				default: {
					return 0
				}
			}
		})
		.reduce((acc, cur) => acc + cur, 0)
}

function getFitness(character: ProcessedCharacter, currentParty: ProcessedCharacter[], data: JSONData) {
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

	// If party doesn't have a shield nor a healer, give all shielders and healers points
	// Else subtract points from shielders and healers
	const defensiveRoles = currentParty.map(c => c.id).includes("hu_tao")
		? ["shield"]
		: ["shield", "heal"]

	scores.push(0 > _intersection(character.roles, defensiveRoles).length
		? 0 > _intersection(partyRoles, defensiveRoles).length
			? -1
			: 1
		: 0
	)

	// Give points for role variability
	scores.push(_difference(character.roles, partyRoles).length / 3)

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

	// Add/subtract points for character-specific interactions
	scores.push(getCharacterCompatibility(currentParty, character))

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
			"Character-specific interactions",
		]

		console.debug(
			"Considering",
			character.id,
			Object.fromEntries(
				scores.map((score, i) => [categories[i], score])
			)
		)
	}

	return _sum(scores)
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

		return _shuffle(pool)
			.map(c => ({ characterId: c.id, fitness: getFitness(c, selected, jsonData) }))
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
