import _range from "lodash/range"
import { computed, readonly } from "vue"
import { useJsonDataStore, useUserDataStore } from "@/stores"
import type { Ref } from "vue"

// Arbitrary letters used for each rank
const letters = ["SS", "S", "A", "B", "C", "D", "E", "F"]

export function useTierList(tiers: number = 5, includeUnowned: Ref<Boolean>) {
	const effectiveTiers = Math.max(2, Math.min(letters.length, tiers))
	const jsonData = useJsonDataStore()
	const userData = useUserDataStore()

	const list = computed(() => {
		const chars = Object.entries(jsonData.characters)
			// Not interested in characters that are not owned
			.filter(([id]) => includeUnowned.value ? true : id in userData.ownedCharacters)
			// Get scores for current constellation levels
			.map(([id, character]) => ({
				...character,
				owned: id in userData.ownedCharacters,
				id,
				score: character.score[userData.ownedCharacters[id]?.constellation || 0]
			}))
			// Order by score
			.sort((a, b) => b.score - a.score)

		// Get lowest and highest score for scaling
		const minScore = chars?.at(-1)?.score || 0
		const maxScore = chars?.at(0)?.score || 10

		// Map scores to tiers
		return _range(effectiveTiers).map(i => ({
			tier: letters[i],
			characters: chars
				.map(char => ({
					...char,
					tier: Math.floor(((char.score - minScore) / (maxScore - minScore)) * (effectiveTiers - 1) + 1)
				}))
				.filter(({ tier }) => tier === effectiveTiers - i),
		}))
	})

	return readonly(list)
}
