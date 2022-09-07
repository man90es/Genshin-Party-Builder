import _capitalise from "lodash/capitalize"
import _sample from "lodash/sample"

const reassurances = [
	"glorious", "great", "lovely",
	"magnificent", "marvellous", "neat",
	"preem", "splendid", "sublime",
	"superb", "terrific", "wonderful",
]

export default function getRandomReassurance(capitalised: boolean): string {
	const r = _sample(reassurances) as string
	return capitalised ? _capitalise(r) : r
}
