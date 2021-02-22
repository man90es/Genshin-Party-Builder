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

export default function calculateParties(owned, n) {
	let pool = ALL_CHARACTERS.filter(c => c.id in owned)
	let party = []

	for (let i = 0; i < n; ++i) {
		let damageDealers = seek(pool, owned, ALL_ROLES.ROLE_DAMAGE, 1)
		party[0] = damageDealers[0]
		pool = pool.filter(c => c.id != damageDealers[0].id)
	}

	for (let i = 0; i < n; ++i) {
		let healers = seek(pool, owned, ALL_ROLES.ROLE_HEALER, 1)
		party[3] = healers[0]
		pool = pool.filter(c => c.id != healers[0].id)
	}

	for (let i = 0; i < n; ++i) {
		let supports = seek(pool, owned, ALL_ROLES.ROLE_SUPPORT, 2)
		party[1] = supports[0]
		party[2] = supports[1]
	}

	return [party]
}
