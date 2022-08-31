import _capitalise from "lodash/capitalize"
import _sample from "lodash/sample"

const reassurance = [
	"glorious", "great", "lovely",
	"magnificent", "marvellous", "neat",
	"preem", "splendid", "sublime",
	"superb", "terrific", "wonderful",
]

export default function useRandomReassurance() {
	return {
		generateReassurance: () => _capitalise(_sample(reassurance))
	}
}
