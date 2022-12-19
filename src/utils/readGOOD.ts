const errors = {
	badFormat: (s1?: any) => `Selected file is in a wrong format${s1 ? " " + s1 : ""}. Please try another file.`,
	badVersion: (s1: any) => `The GOOD format version ${s1} of the selected file is currently unsupported. Please try again later.`,
	noCharacters: () => "Selected file contains no character data. Please try another file.",
}

export default async function readGOOD(file: File): Promise<{ characters: any[] }> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		if ("application/json" !== file.type) {
			return reject(errors.badFormat(file.type))
		}

		reader.onload = () => {
			const data = JSON.parse(reader.result as string)

			if ("GOOD" !== data.format) {
				return reject(errors.badFormat())
			}

			if (1 > data.version || 3 <= data.version) {
				return reject(errors.badVersion(data.version))
			}

			if (!data.characters) {
				return reject(errors.noCharacters())
			}

			return resolve(data)
		}

		reader.readAsText(file)
	})
}
