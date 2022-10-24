<template>
	<main>
		<template v-if="userData.enoughCharacters">
			<p>
				Here's a special leaderboard just for you!
				It was generated from the list of characters
				you selected earlier.
			</p>
			<div class="options-wrapper">
				Display unowned characters?
				<SelectButton v-model="displayUnowned" />
			</div>
			<TierLine
				:characters="l.characters"
				:key="l.tier"
				:tier="l.tier"
				v-for="l of list"
			/>
		</template>
		<p v-else>
			You don't seem to have selected enough characters
			to build a custom tier list for you. Please
			go to the «Characters» tab and select at least 5
			characters.
		</p>
	</main>
</template>

<script setup>
	import { ref } from "vue"
	import { useTierList } from "@/hooks/tierList"
	import { useUserDataStore } from "@/stores/userData"
	import SelectButton from "@/components/SelectButton"
	import TierLine from "@/components/TierLine"

	const displayUnowned = ref(false)

	const userData = useUserDataStore()
	const list = useTierList(5, displayUnowned)
</script>
