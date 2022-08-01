import { Store, useStore } from "vuex"
import { validateData } from "@/utils"
import type { JSONData } from "@/types"
import type { StoreState } from "@/store/StoreState"

const requestInit: RequestInit = {
	mode:     "cors",
	redirect: "follow",
}

export default function() {
	const store: Store<StoreState> = useStore()

	function fetchData(): void {
		if (Object.keys(store.state.data.characters).length > 0) return // Already fetched

		fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.v2.json`, requestInit)
			.then(response => response.json())
			.then((json: JSONData) => {
				if (!validateData(json)) {
					console.log("Invalid data format")
					return
				}

				store.commit("setData", json)
			})
	}

	return { fetchData }
}
