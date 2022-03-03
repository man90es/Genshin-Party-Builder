import { createStore } from "vuex"
import Memento from "memento-vuex"

import type { JSONData, SimpleParty } from "@/types"
import type { StateParty } from "./StateParty"
import type { StoreState } from "./StoreState"

class Party implements StateParty {
	name: string | null
	members: SimpleParty

	constructor() {
		this.name = null
		this.members = [null, null, null, null]
	}
}

export default createStore<StoreState>({
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
		setData(state, data: JSONData) {
			state.data = data
		},

		setHave(state, { id, have }: { id: string, have: boolean }) {
			if (have === true) {
				if (state.ownedCharacters[id] !== undefined) return
				state.ownedCharacters[id] = { constellation: 0 }
			} else {
				delete state.ownedCharacters[id]
			}
		},

		updateConstellation(state, { id, value }: { id: string, value: number }) {
			const characterData = state.data.characters.find(c => c.id == id)
			if (characterData === undefined) {
				console.error("Unknown character id", id)
				return
			}

			const desired: number = state.ownedCharacters[id]
				? state.ownedCharacters[id].constellation + value
				: value

			state.ownedCharacters[id] = {
				constellation: Math.min(Math.max(desired, 0), characterData.maxConstellation ?? 6)
			}
		},

		pushParty(state) {
			state.parties.push(new Party())
		},

		setPartyMember(state, { pI, cI, cId }: { pI: number, cI: number, cId: string | null }) {
			state.parties[pI].members[cI] = cId
		},

		deleteParty(state, index: number) {
			state.parties.splice(index, 1)
		},

		import(state, backup: StoreState) {
			Object.assign(state, backup)
		},
	},
	getters: {
		constellation: (state) => (characterID: string): number | null => {
			const c: number | undefined = state.ownedCharacters[characterID]?.constellation
			return c !== undefined ? c : null
		}
	}
})
