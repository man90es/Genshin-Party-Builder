import type { JSONData } from "@/types"
import type { StateParty } from "./StateParty"

export type StoreState = {
	data: JSONData,
	ownedCharacters: {
		[key: string]: {
			constellation: number
		}
	},
	parties: StateParty[]
}
