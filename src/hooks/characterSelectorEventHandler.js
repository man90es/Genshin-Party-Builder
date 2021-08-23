import { ref } from "vue"
import { useStore } from "vuex"

export default function() {
	const store = useStore()
	const menuData = ref(null)

	window.mitt.on("character-clicked", (data) => {
		if (data.pIndex !== undefined && data.cIndex !== undefined) {
			menuData.value = data
		} else {
			store.commit("setPartyMember", {
				pI: menuData.value.pIndex,
				cI: menuData.value.cIndex,
				cID: data.cID
			})

			menuData.value = null
		}
	})

	window.mitt.on("character-selection-dialogue-backdrop-clicked", () => {
		menuData.value = null
	})

	return { characterSelectorData: menuData }
}
