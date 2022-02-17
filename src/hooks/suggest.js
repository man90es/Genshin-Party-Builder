import { useStore } from "vuex"

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))

		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}

function seek(characters, userData, role, elementId, limit) {
	return shuffle(characters)
		.filter((c) => {
			const constellation = userData[c.id].constellation

			if (c.rating[role.id][constellation] < 1) {
				return false
			}

			if (role.id === "ROLE_DAMAGE" && c.rating["ROLE_DAMAGE"][constellation] <= c.rating["ROLE_SUPPORT"][constellation]) {
				return false
			}

			return true
		})
		.sort((a, b) => {
			return userData[a.id].constellation > userData[b.id].constellation ? 1 : -1
		})
		.sort((a, b) => {
			let aR = a.rating[role.id][userData[a.id].constellation] + (elementId && a.element === elementId ? 1.5 : 0)
			let bR = b.rating[role.id][userData[b.id].constellation] + (elementId && b.element === elementId ? 1.5 : 0)

			return aR < bR ? 1 : -1
		})
		.slice(0, limit)
}

function analyseParty(party, userData) {
	let hasDamage = false
	let hasHealer = false
	let damageDealer
	let damageElement
	let hasDamageResonance = false

	for (let i = 0; i < 4; ++i) {
		const curCharacter = party[i]

		if (curCharacter === null) {
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

	if (damageElement !== undefined) {
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

	function suggest(partyIndex, limit) {
		const data = store.state.data
		const party = store.state.parties[partyIndex].members
		const owned = store.state.ownedCharacters

		if (!party.includes(null)) return [null, []]

		let suggestedPosition
		let suggestedCharacters

		// Construct a pool of characters to suggest from
		let pool = data.characters.filter(c => c.id in owned)

		for (let i = 0; i < 4; ++i) {
			const char = party[i]

			if (char !== null) {
				pool = pool.filter(c => c.id != char)
			}
		}

		if (pool.length === 0) return [null, []]

		// Choose suggested position
		const { hasDamage, hasHealer, hasDamageResonance, damageElement } = analyseParty(party.map(cId => data.characters.find(c => c.id === cId) || null), owned, data)
		const prioritiseHealer = !hasHealer && party.reduce((empty, c) => empty + Number(c === null), 0) == 1

		if (!hasDamage && !prioritiseHealer) {
			suggestedPosition = "damage dealer"
			suggestedCharacters = seek(pool, owned, data.roles.find(r => r.id === "ROLE_DAMAGE"), undefined, limit)
		} else if (!hasHealer) {
			suggestedPosition = "healer"
			suggestedCharacters = seek(pool, owned, data.roles.find(r => r.id === "ROLE_HEALER"), undefined, limit)
		} else {
			suggestedPosition = "support"
			suggestedCharacters = seek(pool, owned, data.roles.find(r => r.id === "ROLE_SUPPORT"), !hasDamageResonance ? damageElement : undefined, limit)
		}

		if (suggestedCharacters.length < 1) {
			suggestedPosition = "support"
			suggestedCharacters = seek(pool, owned, data.roles.find(r => r.id === "ROLE_SUPPORT"), !hasDamageResonance ? damageElement : undefined, limit)
		}

		return [suggestedPosition, suggestedCharacters.map(c => c.id)]
	}

	return { suggest }
}
