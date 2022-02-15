import { useStore } from "vuex"

export default function() {
	const store = useStore()

	function fetchData() {
		if (store.state.data.characters.length > 0) return

		fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.json`, { mode: "cors", redirect: "follow" })
			.then(response => response.json())
			.then(json => store.commit("setData", json))
	}

	function getAssetURI(category, name) {
		const extension = category === "font" ? "ttf" : "png"
		return `${process.env.VUE_APP_ASSETS_ENDPOINT}${category}s/${name}.${extension}`
	}

	function getBackgroundURI() {
		return `${process.env.VUE_APP_ASSETS_ENDPOINT}background.png`
	}

	return { fetchData, getAssetURI, getBackgroundURI}
}
