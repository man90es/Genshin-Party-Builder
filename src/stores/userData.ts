import { defineStore } from "pinia"
import { pascalToSnake, migrateCharacterId } from "@/utils"
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
		[key: string]: {
			constellation: number
		}
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

	actions: {
		importGOOD(data: { key: string; constellation: number }[]) {
			this.$patch({
				ownedCharacters: Object.fromEntries(
					data.map(({ key, constellation }) => [
						pascalToSnake(key),
						{ constellation },
					])
				)
			})
		},

		setHave(id: string, have: boolean) {
			if (have === true) {
				if (this.ownedCharacters[id] !== undefined) {
					return
				}

				this.ownedCharacters[id] = { constellation: 0 }
			} else {
				delete this.ownedCharacters[id]
			}
		},

		createParty() {
			this.parties.push(new Party())
		},

		setPartyMember(pI: number, cI: number, cId: string | null) {
			this.parties[pI].members[cI] = cId
		},

		disbandParty(i: number) {
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
