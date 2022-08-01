import type { JSONData } from "@/types"

export function validateData(data: JSONData) {
	// All IDs should be unique and have no gaps
	const characterIds = Object.values(data.characters).map(c => c.id).sort((a, b) => a > b ? 1 : -1)
	for (const [id, i] of characterIds.entries()) {
		if (id !== i) return false
	}

	return true
}
