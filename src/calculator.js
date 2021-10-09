function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))

		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}

function seek(characters, userData, role, elementId) {
	const found = shuffle(characters)
		.sort((a, b) => {
			return userData[a.id].constellation > userData[b.id].constellation ? 1 : -1
		})
		.sort((a, b) => {
			let aR = a.rating[role.id][userData[a.id].constellation] + (elementId && a.element === elementId ? 1.5 : 0)
			let bR = b.rating[role.id][userData[b.id].constellation] + (elementId && b.element === elementId ? 1.5 : 0)

			return aR < bR ? 1 : -1
		})[0]
	return found
}

function analyseParty(party, userData) {
	let hasDamage = false
	let hasHealer = false
	let damageDealer
	let damageElement
	let hasDamageResonance = false

	for (let i = 0; i < 4; ++i) {
		const curCharacter = party[i]

		if (curCharacter === undefined) {
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

export default function suggestParty(party, owned, data) {
	if (data.characters.length === 0) {
		return [undefined, undefined, undefined, undefined]
	}

	let pool = data.characters.filter(c => c.id in owned)
	let suggestions = []

	// Process characters added by the user
	for (let i = 0; i < 4; ++i) {
		const char = party[i]

		if (char) {
			suggestions.push(data.characters.find(c => c.id === char))
			pool = pool.filter(c => c.id != char)
		}

		suggestions.push(undefined)
	}

	if (!pool.length === 0) {
		return suggestions.map(c => c.id)
	}

	while (suggestions.includes(undefined)) {
		const { hasDamage, hasHealer, hasDamageResonance, damageElement } = analyseParty(suggestions, owned, data)
		const undefinedIndex = suggestions.indexOf(undefined)
		let found

		if (!hasHealer) {
			found = seek(pool, owned, data.roles.find(r => r.id === "ROLE_HEALER"))
		} else if (!hasDamage) {
			found = seek(pool, owned, data.roles.find(r => r.id === "ROLE_DAMAGE"))
		} else {
			found = seek(pool, owned, data.roles.find(r => r.id === "ROLE_SUPPORT"), !hasDamageResonance ? damageElement : undefined)
		}

		suggestions.splice(undefinedIndex, 1, found)
		pool = pool.filter(c => c.id != found.id)
	}

	return suggestions.map(c => c.id)
}
