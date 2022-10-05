<template>
	<main>
		<LeaderboardLine
			:characters="l.characters"
			:key="l.tier"
			:tier="l.tier"
			v-for="l of leaderboard"
		/>
	</main>
</template>

<script setup lang="ts">
	import { useJsonDataStore } from "@/stores/jsonData"
	import { useLeaderboard } from "@/hooks/leaderboard"
	import LeaderboardLine from "@/components/LeaderboardLine"

	const jsonData = useJsonDataStore()
	jsonData.sync()

	const leaderboard = useLeaderboard()
</script>

<style scoped>
	main {
		padding: 0 1em;
	}
</style>
