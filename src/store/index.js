import Vue from 'vue'
import { createStore } from 'vuex'
import { lSPlugin } from './localStorage.js'

export default createStore({
	state: {
		ownedCharacters: {}
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

		import(state, payload) {
			for (const [key, value] of Object.entries(payload)) {
				state[key] = value
			}
		},
	},
	getters: {
		characters: (state) => {
			return state.ownedCharacters
		},

		constellation: (state) => (characterID) => {
			return state.ownedCharacters[characterID]
				? state.ownedCharacters[characterID].constellation
				: null
		}
	}
})
