import _snakeCase from "lodash/snakeCase"
import { defineStore } from "pinia"
import { migrateCharacterId } from "@/utils"
import type { SimpleParty } from "@/types"

class Party {
	name: string | null
	members: SimpleParty

	constructor() {
		this.name = null
		this.members = [null, null, null, null]
	}
}

type UserDataState = {
	ownedCharacters: {
		[key: string]: { constellation: number }
	},
	parties: {
		name: string | null
		members: (string | null)[]
	}[],
}

export const useUserDataStore = defineStore("userDataStore", {
	state: () => ({
		ownedCharacters: {},
		parties: [],
	}) as UserDataState,

	getters: {
		emptyPartyIndex: (state): number | undefined => {
			const idx = state.parties.findIndex(
				(p) => p.members.reduce((s, m) => s + Number(m === null), 0) === 4
			)

			return idx > -1 ? idx : undefined
		}
	},

	actions: {
		importGOOD(data: { key: string; constellation: number }[]): void {
			this.ownedCharacters = Object.fromEntries(
				data.filter(({ key }) => !/traveler/i.test(key))
					.map(({ key, constellation }) => [_snakeCase(key), { constellation }])
			)
		},

		setHave(id: string, have: boolean): void {
			if (have === true) {
				if (this.ownedCharacters[id] !== undefined) {
					return
				}

				this.ownedCharacters[id] = { constellation: 0 }
			} else {
				delete this.ownedCharacters[id]
			}
		},

		createParty(): number {
			if (undefined !== this.emptyPartyIndex) {
				return this.emptyPartyIndex
			}

			this.parties.push(new Party())
			return this.parties.length - 1
		},

		setPartyMember(pI: number, cI: number, cId: string | null): void {
			this.parties[pI].members[cI] = cId
		},

		disbandParty(i: number): void {
			this.parties.splice(i, 1)
		}
	},

	persist: {
		key: "gpb-vuex",
		serializer: {
			serialize: JSON.stringify,
			deserialize: (string) => {
				const parsed: UserDataState = JSON.parse(string)

				let ownedCharacters = parsed.ownedCharacters
				let parties = parsed.parties

				if (ownedCharacters && /^CHARACTER_.+/.test(Object.keys(ownedCharacters)[0])) {
					ownedCharacters = Object.fromEntries(Object.entries(ownedCharacters).map(([cId, d]) => [migrateCharacterId(cId), d]))
				}

				if (parties && parties.length && /^CHARACTER_.+/.test(parties[0].members[0] || "")) {
					parties = parties.map(p => ({
						members: p.members.map(m => null === m ? null : migrateCharacterId(m)),
						name: p.name,
					}))
				}

				return { ownedCharacters, parties }
			}
		}
	},
})
