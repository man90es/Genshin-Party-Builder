import { reactive, readonly } from "vue"

export function useStrings() {
	const strings = reactive({
		characterScreenInstruction: "To start creating your winning team, import or manually select the characters you own. Once you're done, switch to the parties or tier list tab to see the recommendations based on selected characters. Don't worry if you need to make changes later on: you can always return to this step and update your characters.",
		pressStart: "Press start to select your characters.",
		teamsScreenNoCharacters: "Yikes! Looks like we're missing a crucial element in creating your custom team. Please head over to the characters tab and select at least five characters. This will enable us to provide you with personalised recommendations on building a winning team.",
		welcome1: "Welcome to an AI-assisted team creation tool for Genshin Impact that helps players assemble well-rounded teams by analysing characters' elements, constellation levels, weapon types, potential elemental reactions, preferred roles, community ratings, and more. The tool is designed for beginners and experienced players alike, enabling them to maximise their characters' strengths and synergies.",
	})

	return readonly(strings)
}
