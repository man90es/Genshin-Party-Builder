import { capitalise } from "@/utils"

export default function() {
	const reassurance = ["great", "wonderful", "marvellous", "magnificent", "superb", "glorious", "sublime", "lovely", "neat", "terrific", "splendid", "marvellous"]

	function generateReassurance(): string {
		return capitalise(reassurance[Math.floor(Math.random() * reassurance.length)])
	}

	return { generateReassurance }
}
