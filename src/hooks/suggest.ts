import { shuffle } from "@/utils"
import { useStore } from "vuex"
import type { Character, ProcessedCharacter, JSONData, SimpleParty } from "@/types"

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

function getFitness(character: ProcessedCharacter, currentParty: ProcessedCharacter[]) {
	const scores = []

	// Start with points from the tier list
	scores.push(character.score / 6)

	// Add points for each role character has that party doesn't have
	scores.push(
		character.roles.reduce((acc, cur) => (
			currentParty.map(c => c.roles).flat().includes(cur)
				? acc
				: acc + 1
		), 0) / 7
	)

	// Subtract points for having the same weapon type as other characters in party
	scores.push(
		-currentParty.filter(c => character.weapon === c.weapon).length / 3
	)

	// Add a point for potential to create resonance (except for useless 4-unique resonance)
	scores.push(
		Number(1 === currentParty.filter(c => character.element === c.element).length)
	)

	// Add/subtract points for character-specific interactions
	switch (character.id) {
		case "yelan": {
			const currentPartyElements = new Set(currentParty.map(c => c.element))
			// When the party has 1/2/3/4 Elemental Types,
			// Yelan's Max HP is increased by 6%/12%/18%/30%.
			// And her skills scale off her HP
			scores.push(
				currentPartyElements.size + Number(!currentPartyElements.has("hydro"))
			)

			break
		}

		default:
			scores.push(0)
	}

	return scores.reduce((acc, cur) => acc + cur, 0)
}

export default function () {
	const store = useStore()

	function suggest(partyId: number, n: number) {
		const currentParty: SimpleParty = store.state.parties[partyId].members
		const data: JSONData = store.state.data
		const ownedCharacters = store.state.ownedCharacters

		const processedCharacters = Object.entries(data.characters)
			// Not interested in characters that are not owned
			.filter(([id]) => id in ownedCharacters)
			.flatMap(([id, character]) => (
				undefined !== character
					? [processCharacter(id, character, ownedCharacters[id].constellation)]
					: []
			))

		const selected = currentParty
			.filter(Boolean)
			.flatMap((id) => {
				const found = processedCharacters.find(c => id === c.id)
				return found ? [found] : []
			})

		const pool = processedCharacters
			.filter(({ id }) => !(currentParty.includes(id)))

		return [
			"character",
			shuffle(pool)
				.map(c => ({ characterId: c.id, fitness: getFitness(c, selected) }))
				.sort((a, b) => a.fitness < b.fitness ? 1 : -1)
				.slice(0, n)
				.map(f => f.characterId),
		]
	}

	return { suggest }
}
