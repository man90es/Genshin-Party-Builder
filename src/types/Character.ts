export type Character = {
	name?: string,
	background?: string,
	damage: string[],
	element: string,
	roles: (string | { c: number, role: string })[],
	score: number[],
	stars: number,
	weapon: string,
}
