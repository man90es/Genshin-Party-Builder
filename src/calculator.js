import { ALL_CHARACTERS, ALL_ROLES } from './assets/data.js'

function seek(characters, userData, role, n) {
	let result = []

	let sorted = characters.sort((a, b) => {
		return a.rating[role.id][userData[a.id].constellation] < b.rating[role.id][userData[b.id].constellation] ? 1 : -1
	})

	for (let i = 0; i < Math.min(n, sorted.length); ++i) {
		result.push(sorted[i])
	}

	return result
}

export default function suggestParty(party, owned) {
	let pool = Object.values(ALL_CHARACTERS).filter(c => c.id in owned)
	let suggestions = []

	party.forEach(char => {
		if (char) {
			pool = pool.filter(c => c.id != char.id)
		}
	})

	if (!party[3]) {
		let healers = seek(pool, owned, ALL_ROLES.ROLE_HEALER, 1)
		suggestions[3] = healers[0]
		pool = pool.filter(c => c.id != healers[0].id)
	}

	if (!party[0]) {
		let damageDealers = seek(pool, owned, ALL_ROLES.ROLE_DAMAGE, 1)
		suggestions[0] = damageDealers[0]
		pool = pool.filter(c => c.id != damageDealers[0].id)
	}

	if (!party[1]) {
		let supports = seek(pool, owned, ALL_ROLES.ROLE_SUPPORT, 1)
		suggestions[1] = supports[0]
		pool = pool.filter(c => c.id != supports[0].id)
	}

	if (!party[2]) {
		let supports = seek(pool, owned, ALL_ROLES.ROLE_SUPPORT, 1)
		suggestions[2] = supports[0]
		pool = pool.filter(c => c.id != supports[0].id)
	}

	return suggestions
}
