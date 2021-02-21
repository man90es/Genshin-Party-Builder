import Vue from 'vue'
import { createStore } from 'vuex'

export default createStore({
	state: {},
	mutations: {
		toggleHave(state, payload) {
			let data = state[payload.id] || { have: false, constellation: 0 }
			data.have = !data.have

			if (!data.have) {
				data.constellation = 0
			}

			state[payload.id] = data
		},

		updateConstellation(state, payload) {
			let bounds = [0, 6]

			let value = state[payload.id]
				? Math.min(Math.max(state[payload.id].constellation + payload.value, bounds[0]), bounds[1])
				: Math.min(Math.max(payload.value, bounds[0]), bounds[1])

			state[payload.id] = { have: true, constellation: value }
		},
	},
})
