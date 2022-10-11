<template>
	<main>
		<template v-if="userData.enoughCharacters">
			<p>
				Here's a special leaderboard just for you!
				It was generated from the list of characters
				you selected earlier.
			</p>
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

<script setup lang="ts">
	import { useLeaderboard } from "@/hooks/leaderboard"
	import { useUserDataStore } from "@/stores/userData"
	import TierLine from "@/components/TierLine"

	const userData = useUserDataStore()
	const list = useLeaderboard()
</script>
