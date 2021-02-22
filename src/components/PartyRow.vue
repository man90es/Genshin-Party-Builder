<template>
	<div>
		<Character :meta="meta[0]" role="Damage Dealer" />
		<Character :meta="meta[1]" role="Support" />
		<Character :meta="meta[2]" role="Support" />
		<Character :meta="meta[3]" role="Healer" />
	</div>
</template>

<script>
	import Character from './Character.vue'

	export default {
		name: 'PartyRow',
		props: ['meta'],
		components: {
			Character
		}
	}
</script>

<style scoped>
	div {
		display: flex;
	}

	.inputs {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 1.6em;
		gap: 0.5em;
	}
</style>
