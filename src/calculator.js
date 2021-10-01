function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))

		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}

function seek(characters, userData, role, element) {
	return shuffle(characters)
		.sort((a, b) => {
			return userData[a.id].constellation > userData[b.id].constellation ? 1 : -1
		})
		.sort((a, b) => {
			let aR = a.rating[role.id][userData[a.id].constellation] + (element && a.element.id == element ? 1.5 : 0)
			let bR = b.rating[role.id][userData[b.id].constellation] + (element && b.element.id == element ? 1.5 : 0)

			return aR < bR ? 1 : -1
		})[0]
}

function hasDPSResonance(party) {
	// This check isn't needed since finding a DPS has a higher priority
	// than ensuring a resonance
	// if (!party[0]) return false

	for (let i = 1; i <= 4; ++i) {
		if (party[i] && party[i].element === party[0].element) {
			return true
		}
	}

	return false
}

export default function suggestParty(party, owned, data) {
	if (data.characters.length === 0) {
		return [undefined, undefined, undefined, undefined]
	}

	let pool = data.characters.filter(c => c.id in owned)
	let suggestions = []

	// Process characters added by the user
	party.forEach((char, i) => {
		if (char) {
			suggestions[i] = data.characters.find(c => c.id === char)
			pool = pool.filter(c => c.id != char)
		}
	})

	if (!pool.length) {
		return suggestions.map(c => c.id)
	}

	// Find a DPS
	if (!suggestions[0]) {
		suggestions[0] = seek(pool, owned, data.roles.find(r => r.id === "ROLE_DAMAGE"))
		pool = pool.filter(c => c.id != suggestions[0].id)
	}

	if (!pool.length) {
		return suggestions.map(c => c.id)
	}

	// Find a healer
	if (!suggestions[3]) {
		suggestions[3] = seek(pool, owned, data.roles.find(r => r.id === "ROLE_HEALER"))
		pool = pool.filter(c => c.id != suggestions[3].id)
	}

	if (!pool.length) {
		return suggestions.map(c => c.id)
	}

	// Find a support
	if (!suggestions[1]) {
		suggestions[1] = seek(pool, owned, data.roles.find(r => r.id === "ROLE_SUPPORT"), !hasDPSResonance(suggestions) ? suggestions[0].element.id : null)
		pool = pool.filter(c => c.id != suggestions[1].id)
	}

	if (!pool.length) {
		return suggestions.map(c => c.id)
	}

	// Find a support
	if (!suggestions[2]) {
		suggestions[2] = seek(pool, owned, data.roles.find(r => r.id === "ROLE_SUPPORT"), !hasDPSResonance(suggestions) ? suggestions[0].element.id : null)
		pool = pool.filter(c => c.id != suggestions[2].id)
	}

	return suggestions.map(c => c.id)
}
