const specialV1Transitions = new Map([
	["CHARACTER_AYAKA", "kamisato_ayaka"],
	["CHARACTER_AYATO", "kamisato_ayato"],
	["CHARACTER_HEIZOU", "shikanoin_heizou"],
	["CHARACTER_KAZUHA", "kaedehara_kazuha"],
])

export default function migrateCharacterId(id: string): string {
	if (!/^CHARACTER_.+/.test(id)) {
		return id
	}

	return specialV1Transitions.get(id) || id.replace("CHARACTER_", "").toLowerCase().replace("traveller", "traveler")
}
