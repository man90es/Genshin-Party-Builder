import { Character } from "./Character"
import { Preset } from "./Preset"

export type JSONData = {
	version: string
	characters: {
		[key: string]: Character
	}
	elements: {
		[key: string]: { name: string }
	}
	presets: Preset[]
	reactions: {
		header: string[]
		matrix: number[][]
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
