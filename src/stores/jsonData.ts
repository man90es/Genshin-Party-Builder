import { defineStore } from "pinia"
import type { JSONData } from "@/types"

export const useJsonDataStore = defineStore("jsonDataStore", {
	state: () => ({
		characters: {},
		elements: {},
		reactions: { header: [], matrix: [] },
		roles: {},
		spritesheets: {},
		weapons: {},
	}) as JSONData
})
