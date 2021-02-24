<template>
	<div class="party-wrapper">
		<div class="partyName">
			Party {{ number + 1 }}
		</div>
		<Character v-for="(role, i) in roles" :key="i" :meta="meta.defined[i] || meta.suggestion[i]" :suggestion="!!meta.suggestion[i]" :role="role" :pIndex="number" :cIndex="i" :clickable="true" />
	</div>
</template>

<script>
	import Character from './Character.vue'

	export default {
		name: 'PartyRow',
		props: ['meta', 'number'],
		data() {
			return {
				roles: ['DPS', 'Support', 'Support', 'Healer']
			}
		},
		components: {
			Character
		}
	}
</script>

<style scoped>
	.party-wrapper {
		border-radius: 0.5em;
		display: grid;
		grid-template-rows: 1em 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 0.5em;
		margin-bottom: 2em;
		background-color: #0005;
		padding: 0.75em;
	}

	.partyName {
		grid-column: 1/5;
		text-align: left;
	}

	.inputs {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 1.6em;
		gap: 0.25em;
	}
</style>
