import { createStore } from "vuex"
import Memento from "memento-vuex"

function Party() {
	this.name = null
	this.members = [null, null, null, null]
}

export default createStore({
	state: {
		data: {
			roles:      [],
			elements:   [],
			characters: [],
		},
		ownedCharacters: {},
		parties: [],
	},
	plugins: [
		Memento(
			{
				setHave:             "ownedCharacters",
				updateConstellation: "ownedCharacters",
				pushParty:           "parties",
				setPartyMember:      "parties",
				deleteParty:         "parties",
			},
			"gpb-vuex"
		)
	],
	mutations: {
		setData(state, payload) {
			state.data = payload
		},

		setHave(state, { id, have }) {
			if (have === true) {
				if (state.ownedCharacters[id] !== undefined) return
				state.ownedCharacters[id] = { constellation: 0 }
			} else {
				delete state.ownedCharacters[id]
			}
		},

		updateConstellation(state, payload) {
			const characterData = state.data.characters.find(c => c.id == payload.id)
			const desired = state.ownedCharacters[payload.id]
				? state.ownedCharacters[payload.id].constellation + payload.value
				: payload.value

			state.ownedCharacters[payload.id] = {
				constellation: Math.min(Math.max(desired, 0), characterData.maxConstellation ?? 6)
			}
		},

		pushParty(state) {
			state.parties.push(new Party())
		},

		setPartyMember(state, { pI, cI, cId }) {
			state.parties[pI].members[cI] = cId
		},

		deleteParty(state, index) {
			state.parties.splice(index, 1)
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
