export type Character = {
	background?: string
	damage?: string[]
	element: string

	// Internal numeric ID
	id: number

	// Character ID from https://github.com/genshindev/api
	key: string
	name?: string
	release: string
	roles: (string | { c: number; role: string })[]
	score: number[]
	stars: number
	weapon: string
}
