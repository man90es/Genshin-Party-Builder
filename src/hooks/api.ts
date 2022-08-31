import { useJsonDataStore } from "@/stores/jsonData"

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
			.then(json => store.$patch(json))
	}

	return { fetchData }
}
