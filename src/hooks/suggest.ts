import { useStore } from "vuex"

import type { Character, ElementId, JSONData, OwnedIndex, RoleId, SimpleParty } from "@/types"

function shuffle(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))

		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}

function seek(characters: Character[], userData: OwnedIndex, roleId: RoleId, limit: number, elementId?: ElementId) {
	return shuffle(characters)
		.filter((c) => {
			const constellation = userData[c.id].constellation

			if (c.rating[roleId][constellation] < 1) {
				return false
			}

			if (roleId === "ROLE_DAMAGE" && c.rating["ROLE_DAMAGE"][constellation] <= c.rating["ROLE_SUPPORT"][constellation]) {
				return false
			}

			return true
		})
		.sort((a, b) => {
			return userData[a.id].constellation > userData[b.id].constellation ? 1 : -1
		})
		.sort((a, b) => {
			const aR = a.rating[roleId][userData[a.id].constellation] + (elementId && a.element === elementId ? 1.5 : 0)
			const bR = b.rating[roleId][userData[b.id].constellation] + (elementId && b.element === elementId ? 1.5 : 0)

			return aR < bR ? 1 : -1
		})
		.slice(0, limit)
}

function analyseParty(party: Array<Character | null>, userData: OwnedIndex) {
	let damageDealer: Character
	let damageElement: ElementId | null = null
	let hasDamage = false
	let hasHealer = false
	let hasDamageResonance = false

	for (let i = 0; i < 4; ++i) {
		const curCharacter = party[i]

		if (curCharacter === null) {
			continue
		}

		// Ignore not owned characters
		if (!Object.keys(userData).includes(curCharacter.id)) {
			continue
		}

		const curConstellation = userData[curCharacter.id].constellation

		if (curCharacter.rating["ROLE_HEALER"][curConstellation] > 0) {
			hasHealer = true
		}

		if (curCharacter.rating["ROLE_DAMAGE"][curConstellation] > curCharacter.rating["ROLE_SUPPORT"][curConstellation]) {
			hasDamage = true
			damageDealer = curCharacter
			damageElement = curCharacter.element
		}
	}

	if (damageElement !== null) {
		hasDamageResonance = party.findIndex((character) => {
			return character?.id !== damageDealer.id && character?.element === damageElement
		}) > -1
	}

	return {
		hasDamage,
		hasHealer,
		hasDamageResonance,
		damageElement,
	}
}

export default function() {
	const store = useStore()

	function suggest(partyIndex: number, limit: number) {
		const data: JSONData = store.state.data
		const party: SimpleParty = store.state.parties[partyIndex].members
		const owned: OwnedIndex = store.state.ownedCharacters

		// No empty slots left, nothing to suggest
		if (!party.includes(null)) return [null, []]

		let suggestedPosition
		let suggestedCharacters

		// Construct a pool of characters to suggest from
		let pool = data.characters.filter(c => c.id in owned)

		for (let i = 0; i < 4; ++i) {
			const charId = party[i]

			if (charId !== null) {
				pool = pool.filter(c => c.id != charId)
			}
		}

		// No characters left to suggest
		if (pool.length === 0) return [null, []]

		// Choose suggested position
		const { hasDamage, hasHealer, hasDamageResonance, damageElement } = analyseParty(party.map(cId => data.characters.find(c => c.id === cId) || null), owned)
		const prioritiseHealer = !hasHealer && party.reduce((empty, c) => empty + Number(c === null), 0) == 1

		if (!hasDamage && !prioritiseHealer) {
			suggestedPosition = "damage dealer"
			suggestedCharacters = seek(pool, owned, "ROLE_DAMAGE", limit)
		} else if (!hasHealer) {
			suggestedPosition = "healer"
			suggestedCharacters = seek(pool, owned, "ROLE_HEALER", limit)
		} else {
			suggestedPosition = "support"
			suggestedCharacters = seek(pool, owned, "ROLE_SUPPORT", limit, !hasDamageResonance ? damageElement || undefined : undefined)
		}

		if (suggestedCharacters.length < 1) {
			suggestedPosition = "support"
			suggestedCharacters = seek(pool, owned, "ROLE_SUPPORT", limit, !hasDamageResonance ? damageElement || undefined : undefined)
		}

		return [suggestedPosition, suggestedCharacters.map(c => c.id)]
	}

	return { suggest }
}
