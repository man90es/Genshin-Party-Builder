const persistentMutations = {
	toggleHave: 'ownedCharacters',
	updateConstellation: 'ownedCharacters',
	pushParty: 'parties',
	setPartyMember: 'parties',
	deleteParty: 'parties'
}

let data = {}

export const lSPlugin = (store) => {
	// Retrieve saved data
	if (localStorage.vuex !== undefined) {
		data = JSON.parse(localStorage.vuex)
		store.commit('import', data)
	}

	// Watch and save mutations
	store.subscribe((mutation, state) => {
		if (mutation.type in persistentMutations) {
			data[persistentMutations[mutation.type]] = state[persistentMutations[mutation.type]]
			localStorage.vuex = JSON.stringify(data)
		}
	})
}
