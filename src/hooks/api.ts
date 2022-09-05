import { useJsonDataStore } from "@/stores/jsonData"
import type { JSONData } from "@/types"

const requestInit: RequestInit = {
	mode: "cors",
	redirect: "follow",
}

export function useAPI(): { fetchData: () => void } {
	const store = useJsonDataStore()

	function fetchData() {
		if (Object.keys(store.characters).length > 0) return // Already fetched

		fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.v2.json`, requestInit)
			.then(response => response.json())
			.then((data: JSONData) => {
				if ("development" === process.env?.NODE_ENV) {
					store.$patch(data)
					return
				}

				// Filter out unreleased characters
				const now = new Date()
				const characters = Object.fromEntries(Object.entries(data.characters)
					.filter(([, { release }]) => new Date(release) <= now))

				store.$patch({ ...data, characters })
			})
	}

	return { fetchData }
}
