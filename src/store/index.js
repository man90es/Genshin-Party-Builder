import Vue from 'vue'
import { createStore } from 'vuex'

export default createStore({
	state: {},
	mutations: {
		toggleHave(state, payload) {
			if (state[payload.id]) {
				delete state[payload.id]
			} else {
				state[payload.id] = { constellation: 0 }
			}
		},

		updateConstellation(state, payload) {
			let bounds = [0, 6]

			let value = state[payload.id]
				? Math.min(Math.max(state[payload.id].constellation + payload.value, bounds[0]), bounds[1])
				: Math.min(Math.max(payload.value, bounds[0]), bounds[1])

			state[payload.id] = { constellation: value }
		},
	},
	getters: {
		characters: (state) => {
			return state
		}
	}
})
