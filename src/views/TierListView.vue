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
	import { useStrings } from "@/hooks/strings"
	import { useTierList } from "@/hooks/tierList"
	import { useUserDataStore } from "@/stores/userData"
	import SelectButton from "@/components/SelectButton"
	import TierLine from "@/components/TierLine"

	const displayUnowned = ref(false)

	const strings = useStrings()
	const userData = useUserDataStore()
	const list = useTierList(5, displayUnowned)
</script>
