<template>
	<main>
		<template v-if="userData.enoughCharacters">
			<p>Here's a special leaderboard just for you! It was generated from the list of characters you selected earlier.</p>
			<div class="options-wrapper">
				Display with uncollected characters?
				<SelectButton v-model="displayUnowned" />
			</div>
		</template>
		<p v-else>
			Here's a global tier list of Genshin Impact characters. To generate a personalised tier list, please head over to the characters tab and select at least five characters.
		</p>
		<TierLine :characters="l.characters" :key="l.tier" :tier="l.tier" v-for="l of list" />
	</main>
</template>

<script setup>
	import { ref } from "vue"
	import { SelectButton, TierLine } from "@/components"
	import { useTierList } from "@/hooks"
	import { useUserDataStore } from "@/stores"

	const displayUnowned = ref(false)

	const userData = useUserDataStore()
	const list = useTierList(5, displayUnowned)
</script>
