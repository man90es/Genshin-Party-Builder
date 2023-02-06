import { defineStore } from "pinia"
import { preprocessCharacters } from "@/utils"
import type { JSONData } from "@/types"

export const useJsonDataStore = defineStore("jsonDataStore", {
	state: () => ({
		characters: {},
		elements: {},
		presets: [],
		reactions: { header: [], matrix: [] },
		roles: {},
		spritesheets: {},
		version: "",
		weapons: {},
	}) as JSONData,

	actions: {
		async sync() {
			// Already fetched, no need to repeat
			if (0 < Object.keys(this.characters).length) {
				return
			}

			fetch(`${process.env.VUE_APP_ASSETS_ENDPOINT}data.json`, {
				mode: "cors",
				redirect: "follow",
			})
				.then(response => response.json())
				.then((data: JSONData) => {
					this.$patch({
						...data,
						characters: preprocessCharacters(data.characters),
					})
				})
		},
	}
})
