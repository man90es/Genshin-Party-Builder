import { RoleId } from "./RoleId"
import { ElementId } from "./ElementId"
import { Character } from "./Character"

export type JSONData = {
	roles: Array<{ id: RoleId }>,
	elements: Array<{ id: ElementId }>,
	characters: Character[],
}
