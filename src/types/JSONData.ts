import { Character } from "./Character"

export type JSONData = {
	characters: {
		[key: string]: Character
	}
	elements: {
		[key: string]: { name: string }
	}
	roles: {
		[key: string]: { name: string }
	}
	spritesheets: {
		[key: string]: {
			path: string
			extensions: string[]
			indices: {
				[key: string]: [number, number]
			}
		}
	}
	weapons: {
		[key: string]: { name: string }
	}
}
