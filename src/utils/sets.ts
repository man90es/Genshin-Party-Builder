export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
	const result: Set<T> = new Set()

	for (const elem of setB) {
		setA.has(elem) && result.add(elem)
	}

	return result
}
