export type Character = {
	background?: string
	damage?: string[]
	element: string
	id: number
	name?: string
	release: string
	roles: (string | { c: number; role: string })[]
	score: number[]
	stars: number
	weapon: string
}
