import _capitalise from "lodash/capitalize"

export default function characterIdToName(id: string) {
	return id?.split("_").map(_capitalise).join(" ")
}
