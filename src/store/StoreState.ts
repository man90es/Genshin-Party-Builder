import type { JSONData, StateParty } from "@/types"

export type StoreState = {
	data: JSONData,
	ownedCharacters: {
		[key: string]: { constellation: number }
	},
	parties: StateParty[]
}
