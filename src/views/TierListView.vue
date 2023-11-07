<template>
	<main>
		<template v-if="userData.enoughCharacters">
			<p>{{ strings.tierList }}</p>
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
		<p v-else>{{ strings.tiersScreenNoCharacters }}</p>
	</main>
</template>

<script setup>
	import { ref } from "vue"
	import { SelectButton, TierLine } from "@/components"
	import { useStrings, useTierList } from "@/hooks"
	import { useUserDataStore } from "@/stores"

	const displayUnowned = ref(false)

	const strings = useStrings()
	const userData = useUserDataStore()
	const list = useTierList(5, displayUnowned)
</script>
