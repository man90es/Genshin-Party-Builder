import { useStore } from "vuex"
import type { Character, JSONData, SimpleParty } from "@/types"

function processCharacter(character: Character, constellation: number) {
	if (undefined === character) return

	return {
		constellation,
		element: character.element,
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

export default function() {
	const store = useStore()

	function suggest(partyId: number, n: number) {
		const currentParty: SimpleParty = store.state.parties[partyId].members
		const data: JSONData = store.state.data
		const ownedCharacters = store.state.ownedCharacters

		const selected = Object.fromEntries(currentParty
			.map(id => [id, id ? data.characters[id] : null])
			.filter(pair => !pair.includes(null))
			.map(pair => pair)
			.map(([id, character]) => (
				[id, processCharacter(character as Character, ownedCharacters[id as string].constellation)]
			))
		)

		const pool = Object.fromEntries(Object.entries(data.characters)
			.filter(([id]) => id in ownedCharacters)
			.filter(([id]) => !currentParty.includes(id))
			.map(([id, character]) => (
				[id, processCharacter(character, ownedCharacters[id].constellation)]
			))
		)

		return ["character", []]
	}

	return { suggest }
}
