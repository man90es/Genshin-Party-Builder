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
		ownedCharacters: {
			CHARACTER_NOELLE:          { constellation: 0 },
			CHARACTER_AMBER:           { constellation: 0 },
			CHARACTER_KAEYA:           { constellation: 0 },
			CHARACTER_LISA:            { constellation: 0 },
			CHARACTER_TRAVELLER_ANEMO: { constellation: 0 },
		},
		parties: [new Party()],
	},
	plugins: [
		Memento(
			{
				toggleHave:          "ownedCharacters",
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

		toggleHave(state, payload) {
			if (state.ownedCharacters[payload.id]) {
				delete state.ownedCharacters[payload.id]
			} else {
				state.ownedCharacters[payload.id] = { constellation: 0 }
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
