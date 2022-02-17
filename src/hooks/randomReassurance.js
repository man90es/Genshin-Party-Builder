function capitalise(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function() {
	const reassurance = ["great", "wonderful", "marvellous", "magnificent", "superb", "glorious", "sublime", "lovely", "neat", "terrific", "splendid", "marvellous"]

	function generateReassurance() {
		return capitalise(reassurance[Math.floor(Math.random() * reassurance.length)])
	}

	return { generateReassurance }
}
