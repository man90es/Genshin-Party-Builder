import { computed, readonly } from "vue"
import { useJsonDataStore } from "@/stores"
import type { Ref } from "vue"

export const sortingOptions = [
	{
		label: "Name",
		value: "name",
	},
	{
		label: "Rarity",
		value: "rarity",
	},
	{
		label: "Element",
		value: "element",
	},
]

// TODO: Allow sorting by owned state
export function useCharacterIdList(sortBy: Ref<"name" | "rarity" | "element">) {
	const jsonData = useJsonDataStore()

	const list = computed(() => (
		Object.entries(jsonData.characters)
			.sort(([idA, charA], [idB, charB]) => {
				const [a, b] = {
					name: [idA, idB],
					rarity: [charB.stars, charA.stars],
					element: [charA.element, charB.element],
				}[sortBy.value]

				return a > b ? 1 : a < b ? -1 : 0
			})
			.map(([id]) => id)
	))

	return readonly(list)
}
