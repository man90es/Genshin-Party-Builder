import _range from "lodash/range"
import { computed } from "vue"
import { useJsonDataStore } from "@/stores/jsonData"
import { useUserDataStore } from "@/stores/userData"

// Arbitrary letters used for each rank
const letters = ["SS", "S", "A", "B", "C", "D", "E", "F"]

export function useLeaderboard(tiers: number = 5) {
	const effectiveTiers = Math.max(2, Math.min(letters.length, tiers))
	const jsonData = useJsonDataStore()
	const userData = useUserDataStore()

	const leaderboard = computed(() => {
		const chars = Object.entries(jsonData.characters)
			// Not interested in characters that are not owned
			.filter(([id]) => id in userData.ownedCharacters)
			// Get scores for current constellation levels
			.map(([id, character]) => ({
				...character,
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

	return leaderboard
}
