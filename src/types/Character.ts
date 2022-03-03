import { ElementId } from "./ElementId"

export type Character = {
	name: string,
	id: string,
	stars: number,
	colour: "purple" | "yellow" | "red",
	element: ElementId,
	rating: {
		ROLE_DAMAGE: number[],
		ROLE_SUPPORT: number[],
		ROLE_HEALER: number[],
	},
	maxConstellation: number | undefined
}
