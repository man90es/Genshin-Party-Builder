import { useStore } from "vuex"

export default function() {
	const store = useStore()

	function fetchData() {
		fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.json`, { mode: "cors", redirect: "follow" })
			.then(response => response.json())
			.then(json => store.commit("setData", json))
	}

	function getAssetURI(category, name) {
		const extension = category === "font" ? "ttf" : "png"
		return `${process.env.VUE_APP_ASSETS_ENDPOINT}${category}s/${name}.${extension}`
	}

	return { fetchData, getAssetURI }
}
