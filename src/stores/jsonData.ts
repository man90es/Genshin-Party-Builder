import { defineStore } from "pinia"
import type { JSONData } from "@/types"

export const useJsonDataStore = defineStore("jsonDataStore", {
	state: () => ({
		characters: {},
		elements: {},
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
					if ("development" === process.env?.NODE_ENV) {
						this.$patch(data)
						return
					}

					// Filter out unreleased characters
					const now = new Date()
					const characters = Object.fromEntries(
						Object.entries(data.characters)
							.filter(([, { release }]) => new Date(release) <= now)
					)

					this.$patch({ ...data, characters })
				})
		},
	}
})
