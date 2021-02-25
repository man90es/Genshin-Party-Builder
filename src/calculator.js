import { ALL_CHARACTERS, ALL_ROLES } from './assets/data.js'

function seek(characters, userData, role, element) {
	return characters.sort((a, b) => {
		let aR = a.rating[role.id][userData[a.id].constellation] + (element && a.element.id == element ? 1.5 : 0)
		let bR = b.rating[role.id][userData[b.id].constellation] + (element && b.element.id == element ? 1.5 : 0)

		return aR < bR ? 1 : -1
	})[0]
}

function hasDPSResonance(party) {
	// This check isn't needed as finding a DPS is a higher priority 
	// than ensuring a resonance
	// if (!party[0]) return false

	for (let i = 1; i <= 4; ++i) {
		if (party[i] && party[i].element === party[0].element) {
			return true
		}
	}

	return false
}

export default function suggestParty(party, owned) {
	let pool = Object.values(ALL_CHARACTERS).filter(c => c.id in owned)
	let suggestions = []

	// Process characters added by the user
	party.forEach((char, i) => {
		if (char) {
			suggestions[i] = char
			pool = pool.filter(c => c.id != char.id)
		}
	})

	if (!pool.length) {
		return suggestions
	}

	// Find a DPS
	if (!suggestions[0]) {
		suggestions[0] = seek(pool, owned, ALL_ROLES.ROLE_DAMAGE)
		pool = pool.filter(c => c.id != suggestions[0].id)
	}

	if (!pool.length) {
		return suggestions
	}

	// Find a healer
	if (!suggestions[3]) {
		suggestions[3] = seek(pool, owned, ALL_ROLES.ROLE_HEALER)
		pool = pool.filter(c => c.id != suggestions[3].id)
	}

	if (!pool.length) {
		return suggestions
	}

	// Find a support
	if (!suggestions[1]) {
		suggestions[1] = seek(pool, owned, ALL_ROLES.ROLE_SUPPORT, !hasDPSResonance(suggestions) ? suggestions[0].element.id : null)
		pool = pool.filter(c => c.id != suggestions[1].id)
	}

	if (!pool.length) {
		return suggestions
	}

	// Find a support
	if (!suggestions[2]) {
		suggestions[2] = seek(pool, owned, ALL_ROLES.ROLE_SUPPORT, !hasDPSResonance(suggestions) ? suggestions[0].element.id : null)
		pool = pool.filter(c => c.id != suggestions[2].id)
	}

	return suggestions
}
