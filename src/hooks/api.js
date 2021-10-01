import { ref } from "vue"

export default function() {
	function getAssetURI(category, name) {
		return `${process.env.VUE_APP_ASSETS_ENDPOINT}${category}s/${name}.png`
	}

	const data = ref({
		roles:      [],
		elements:   [],
		characters: [],
	})
	fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.json`, { mode: "cors", redirect: "follow" })
		.then(response => response.json())
		.then(json => data.value = json)

	return { data, getAssetURI }
}
