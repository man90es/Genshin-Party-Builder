import { useStore } from "vuex"
import type { Character, JSONData, SimpleParty } from "@/types"

type ProcessedCharacter = {
	constellation: number;
	damage: string[];
	element: string;
	id: string;
	roles: string[];
	score: number;
	weapon: string;
}

function processCharacter(id: string, character: Character, constellation: number): ProcessedCharacter {
	return {
		constellation,
		damage: character.damage || [character.element],
		element: character.element,
		id,
		score: character.score[constellation],
		weapon: character.weapon,
		roles: character.roles
			.map((r) => (
				"object" === typeof r
					? constellation >= r.c
						? r.role
						: undefined
					: r
			))
			.filter(Boolean) as string[],
	}
}

function getFitness(character: ProcessedCharacter, currentParty: ProcessedCharacter[]) {
	const scores = []

	// Start with up to 6 points from the tier list
	scores.push(character.score)

	// Add 1 point for each role character has that party doesn't have
	scores.push(
		character.roles.reduce((acc, cur) => (
			currentParty.map(c => c.roles).flat().includes(cur)
				? acc
				: acc + 1
		), 0)
	)

	// Subtract up to 3 points for having the same weapon type other characters in party
	scores.push(
		-currentParty.filter(c => character.weapon === c.weapon).length
	)

	// TODO: Add points for potential to create resonance
	// TODO: Add/subtract points for character-specific interactions

	return scores.reduce((acc, cur) => acc + cur, 0)
}

export default function () {
	const store = useStore()

	function suggest(partyId: number, n: number) {
		const currentParty: SimpleParty = store.state.parties[partyId].members
		const data: JSONData = store.state.data
		const ownedCharacters = store.state.ownedCharacters

		const selected = currentParty
			.map(id => [id, id ? data.characters[id] : null])
			.filter(pair => !pair.includes(null))
			.map(pair => pair)
			.map(([id, character]) => (
				undefined !== character
					? processCharacter(id as string, character as Character, ownedCharacters[id as string].constellation)
					: null
			))
			.filter(Boolean) as ProcessedCharacter[]

		const pool = Object.entries(data.characters)
			.filter(([id]) => id in ownedCharacters)
			.filter(([id]) => !currentParty.includes(id))
			.map(([id, character]) => (
				undefined !== character
					? processCharacter(id, character, ownedCharacters[id].constellation)
					: null
			))
			.filter(Boolean) as ProcessedCharacter[]

		return [
			"character",
			pool
				.map(c => ({ characterId: c.id, fitness: getFitness(c, selected) }))
				.sort((a, b) => a.fitness < b.fitness ? 1 : -1)
				.slice(0, n)
				.map(f => f.characterId),
		]
	}

	return { suggest }
}
