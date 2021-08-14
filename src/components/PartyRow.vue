<template>
	<div class="party-wrapper">
		<div class="party-name">
			Party {{ index + 1 }}
			<button class="button-x" @click="deleteParty">x</button>
		</div>
		<div class="party-body">
			<Character v-for="(role, i) in roles" :key="characterID(i)" :characterID="characterID(i)" :suggestion="isSuggested(i)" :role="role" :pIndex="index" :cIndex="i" :clickable="true" />
		</div>
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
		},
		methods: {
			deleteParty() {
				this.$store.commit('deleteParty', { index: this.index })
			}
		},
		computed: {
			characterID() {
				return i => this.meta.defined[i] || this.meta.suggestion[i]
			},

			isSuggested() {
				return i => !this.meta.defined[i]
			}
		}
	}
</script>

<style scoped>
	.party-wrapper {
		border-radius: 0.5em;
		margin-bottom: 0.5rem;
		background-color: #fff1;
		padding: 0.75em;
	}

	.party-name {
		display: flex;
		justify-content: space-between;
		padding-bottom: 0.5em;
	}

	.party-body {
		display: flex;
		justify-content: space-around;
	}

	.inputs {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 1.6em;
		gap: 0.25em;
	}

	.button-x {
		color: var(--button-background-color);
		color: var(--button-font-color);
		padding: 0;
		height: 2em;
		width: 2em;
		border: 0.3em solid #7b7c7b;
		border-radius: 50%;
		font-weight: bold;
		outline: none;
		cursor: pointer;
	}
</style>
