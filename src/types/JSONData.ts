import { Character } from "./Character"
import { Preset } from "./Preset"

export type JSONData = {
	assets?: Record<"portraitBg", Array<{
		src: string,
		type: string
	}>>
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
