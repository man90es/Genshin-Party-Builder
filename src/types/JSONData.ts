import { Character } from "./Character"
import { Preset } from "./Preset"

export type JSONData = {
	version: string
	characters: Record<string, Character>
	presets: Preset[]
	reactions: {
		header: string[]
		matrix: number[][]
	}
	spritesheets: Record<string, {
		extensions: string[]
		indices: Record<string, [number, number]>
		path: string
	}>
}
