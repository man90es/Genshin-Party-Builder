export type Character = {
	background?: string,
	damage?: string[],
	element: string,
	name?: string,
	roles: (string | { c: number, role: string })[],
	score: number[],
	stars: number,
	weapon: string,
}
