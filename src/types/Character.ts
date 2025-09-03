export type Character = {
	background?: string
	damage?: string[]
	element: string

	// Internal numeric ID
	id: number

	// URL to character icon on genshin-impact.fandom.com
	icon: string

	// Character ID from genshin-impact.fandom.com
	key: string
	name?: string
	release: string
	roles: string[]
	score: number[]
	stars: number
	weapon: string
}
