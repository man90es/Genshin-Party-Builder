import _snakeCase from "lodash/snakeCase"
import { defineStore } from "pinia"
import { migrateCharacterId } from "@/utils"
import { v4 as uuid } from "uuid"

type MembersTuple = [string | null, string | null, string | null, string | null]

class Party {
	id: string
	members: MembersTuple
	name: string | null
	updatedAt?: string

	constructor() {
		this.id = uuid()
		this.members = [null, null, null, null]
		this.name = null
		this.updatedAt = new Date().toISOString()
	}
}

type UserDataState = {
	ownedCharacters: Record<string, { constellation: number }>,
	parties: Party[],
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
		},

		enoughCharacters: (state): boolean => {
			return 5 <= Object.keys(state.ownedCharacters).length
		},
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
			this.parties[pI].updatedAt = new Date().toISOString()
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
						id: uuid(),
						members: p.members.map(m => m ? migrateCharacterId(m) : null) as MembersTuple,
						name: p.name,
						updatedAt: p.updatedAt,
					}))
				}

				return {
					ownedCharacters,
					parties: parties.map(({ id, ...rest }) => ({
						...rest,
						id: id ?? uuid(),
					})),
				}
			}
		}
	},
})
