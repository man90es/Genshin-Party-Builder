import Vue from 'vue'
import { createStore } from 'vuex'
import { lSPlugin } from './localStorage.js'

function Party() {
	this.name = null
	this.members = [null, null, null, null]
}

export default createStore({
	state: {
		ownedCharacters: {},
		parties: [new Party()]
	},
	plugins: [ lSPlugin ],
	mutations: {
		toggleHave(state, payload) {
			if (state.ownedCharacters[payload.id]) {
				delete state.ownedCharacters[payload.id]
			} else {
				state.ownedCharacters[payload.id] = { constellation: 0 }
			}
		},

		updateConstellation(state, payload) {
			let bounds = [0, 6]

			let value = state.ownedCharacters[payload.id]
				? Math.min(Math.max(state.ownedCharacters[payload.id].constellation + payload.value, bounds[0]), bounds[1])
				: Math.min(Math.max(payload.value, bounds[0]), bounds[1])

			state.ownedCharacters[payload.id] = { constellation: value }
		},

		pushParty(state, payload) {
			state.parties.push(new Party())
		},

		setPartyMember(state, payload) {
			state.parties[payload.pI].members[payload.cI] = payload.cID
		},

		deleteParty(state, payload) {
			state.parties.splice(payload.index, 1)
		},

		import(state, backup) {
			Object.assign(state, backup)
		},
	},
	getters: {
		characters: (state) => {
			return state.ownedCharacters
		},

		parties: (state) => {
			return state.parties
		},

		constellation: (state) => (characterID) => {
			return state.ownedCharacters[characterID]
				? state.ownedCharacters[characterID].constellation
				: null
		}
	}
})
