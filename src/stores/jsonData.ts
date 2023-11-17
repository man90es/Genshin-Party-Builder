import { defineStore } from "pinia"
import type { JSONData } from "@/types"

function filterCharactersByReleased(characters: JSONData["characters"]): JSONData["characters"] {
	const now = new Date()

	return Object.fromEntries(
		Object.entries(characters)
			.filter(([, character]) => (
				"development" === process.env?.NODE_ENV || new Date(character.release) <= now
			))
	)
}

export const useJsonDataStore = defineStore("jsonDataStore", {
	state: (): JSONData => ({
		characters: {},
		presets: [],
		reactions: { header: [], matrix: [] },
		spritesheets: {},
		version: "",
	}),
	actions: {
		async sync() {
			if (undefined === process.env.VUE_APP_DATA_SRC) {
				return
			}

			// Already fetched, no need to repeat
			if (0 < Object.keys(this.characters).length) {
				return
			}

			return fetch(process.env.VUE_APP_DATA_SRC)
				.then(res => res.json())
				.then((data: JSONData) => {
					this.$patch({
						...data,
						characters: filterCharactersByReleased(data.characters),
					})
				})
		},
	},
})
