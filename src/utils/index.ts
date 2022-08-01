export * from "./validateData"

export function shuffle<Type>(array: Type[]): Type[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))

		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}

export function capitalise(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function characterIdToName(id: string) {
	return id?.split("_").map(capitalise).join(" ")
}

export function pascalToSnake(str: string) {
	return str.split(/(?=[A-Z])/).join('_').toLowerCase();
}
