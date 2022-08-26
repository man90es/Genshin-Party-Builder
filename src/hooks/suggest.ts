import { intersection } from "@/utils/sets"
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

function getFitness(character: ProcessedCharacter, currentParty: Set<ProcessedCharacter>, data: JSONData) {
	const scores = []

	// Start with points from the tier list
	scores.push(character.score / 2)

	// Subtract points from DPS characters if party already has a DPS
	// Add points to DPS characters if there's no DPS
	scores.push(([...currentParty].map(c => c.roles).flat().includes("dps") ? -1 : 1) * Number(character.roles.includes("dps")) * 1.5)

	// Add points for each role character has that party doesn't have
	scores.push(
		character.roles.reduce((acc, cur) => (
			[...currentParty].map(c => c.roles).flat().includes(cur)
				? acc
				: acc + 1
		), 0) / 4
	)

	// Subtract points for having the same weapon type as other characters in party
	scores.push(
		-[...currentParty].filter(c => character.weapon === c.weapon).length / 4
	)

	// Add points for potential to create new resonance (except for useless 4-unique resonance)
	scores.push(
		Number(1 === [...currentParty].filter(c => character.element === c.element).length) / 2
	)

	// Reactions strength
	scores.push(
		[...new Set([...currentParty].map(c => c.element))].reduce((acc, cur) => {
			const idxs = [cur, character.element].map(e => data.reactions.header.indexOf(e))
			return acc + data.reactions.matrix[Math.max(...idxs)][Math.min(...idxs)]
		}, 0) / 2
	)

	// Add/subtract points for character-specific interactions
	switch (character.id) {
		case "bennett": {
			// C6 Bennett's ultimate overrides autoattack element with pyro
			// Subtract a point for each character which gets negatively affected
			const badInteraction = new Set(
				["chongyun", "tartaglia", "eula", "ganyu", "keqing", "noelle", "razor", "rosaria"]
			)

			if (5 < character.constellation) {
				scores.push(
					-intersection(new Set([...currentParty].map(c => c.id)), badInteraction).size
				)
			}

			break
		}

		case "chongyun": {
			// Chongyun's ability overrides autoattack element with cryo
			// Subtract a point for each character which gets negatively affected
			const badInteraction = new Set(
				["tartaglia", "eula", "hu_tao", "keqing", "klee", "noelle", "razor", "rosaria", "yoimiya"]
			)

			scores.push(
				-intersection(new Set([...currentParty].map(c => c.id)), badInteraction).size
			)

			break
		}

		case "gorou": {
			// Gorou wants mono-geo
			scores.push(
				[...currentParty].filter(c => "geo" === c.element).length - 1
			)

			break
		}

		case "yelan": {
			const currentPartyElements = new Set([...currentParty].map(c => c.element))
			// When the party has 1/2/3/4 Elemental Types,
			// Yelan's Max HP is increased by 6%/12%/18%/30%.
			// And her skills scale off her HP
			scores.push(
				(currentPartyElements.size + Number(!currentPartyElements.has("hydro"))) / 2
			)

			break
		}
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

		const selected = new Set(
			currentParty
				.filter(Boolean)
				.flatMap((id) => {
					const found = processedCharacters.find(c => id === c.id)
					return found ? [found] : []
				})
		)

		const pool = processedCharacters
			.filter(({ id }) => !(currentParty.includes(id)))

		return shuffle(pool)
			.map(c => ({ characterId: c.id, fitness: getFitness(c, selected, data) }))
			.sort((a, b) => a.fitness < b.fitness ? 1 : -1)
			.slice(0, n)
			.map(f => f.characterId)
	}

	return { suggest }
}
