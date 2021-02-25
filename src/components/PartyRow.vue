<template>
	<div class="party-wrapper">
		<div class="partyName">
			Party {{ index + 1 }}
			<button class="button-x" @click="() => deleteHandler(index)">x</button>
		</div>
		<Character v-for="(role, i) in roles" :key="i" :meta="meta.defined[i] || meta.suggestion[i]" :suggestion="!meta.defined[i]" :role="role" :pIndex="index" :cIndex="i" :clickable="true" />
	</div>
</template>

<script>
	import Character from './Character.vue'

	export default {
		name: 'PartyRow',
		props: ['meta', 'index', 'deleteHandler'],
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
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5em;
		margin-bottom: 0.5rem;
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

	.button-x {
		background-color: #eef1;
		border: none;
		border-radius: 0.125rem;
		color: #bbc;
		outline: none;
		cursor: pointer;
	}
</style>
