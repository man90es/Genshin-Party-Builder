import type { Character } from "@/types"

export default function preprocessCharacters(characters: Record<string, Character>): Record<string, Character> {
	const now = new Date()

	return Object.fromEntries(
		Object.entries(characters)
			.flatMap(([id, character]) => {
				// Filter out unreleased characters in prod
				return "development" === process.env?.NODE_ENV || new Date(character.release) <= now
					? [
						[id, {
							...character,
							// Optimistic default score for new 5-star characters, in the middle of the upper half of the range
							// For 4-star characters, the default score is more realistic, in the middle of the range
							// TODO: Move this part to the backend script and eliminate this whole function
							score: character.score ?? Array.from({ length: 7 }, () => 5 === character.stars ? 7.5 : 5),
						}]
					]
					: []
			})
	)
}
