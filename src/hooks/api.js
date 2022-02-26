import { useStore } from "vuex"

export default function() {
	const store = useStore()

	function fetchData() {
		if (store.state.data.characters.length > 0) return // Already fetched

		fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.json`, { mode: "cors", redirect: "follow" })
			.then(response => response.json())
			.then(json => store.commit("setData", json))
	}

	return { fetchData }
}
