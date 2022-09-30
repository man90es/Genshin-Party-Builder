import _capitalise from "lodash/capitalize"
import type { Character } from "@/types"

type characterListObject = {
	[key: string]: Character
}

export default function preprocessCharacters(characters: characterListObject): characterListObject {
	const now = new Date()

	return Object.fromEntries(
		Object.entries(characters)
			// Filter out unreleased characters in prod
			.filter(([, { release }]) => (
				"development" === process.env?.NODE_ENV || new Date(release) <= now
			))
			.map(([id, character]) => (
				[
					id,
					{
						...character,
						// Generate missing background colours
						background: character.background || { 4: "purple", 5: "yellow" }[character.stars],
						// Generate missing character names
						name: character.name || id?.split("_").map(_capitalise).join(" "),
					}
				]
			))
	)
}
