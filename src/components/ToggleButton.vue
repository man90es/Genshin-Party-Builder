<template>
	<button type="button" :value="modelValue">
		<div
			:class="{ active: !modelValue }"
			@click="toggle"
		>
			No
		</div>
		<div
			:class="{ active: modelValue }"
			@click="toggle"
		>
			Yes
		</div>
	</button>
</template>

<script setup>
	const props = defineProps({ modelValue: Boolean })
	const emit = defineEmits(["update:modelValue"])

	function toggle() {
		emit('update:modelValue', !props.modelValue)
	}
</script>

<style lang="scss" scoped>
	button {
		background-color: transparent;
		display: flex;
		gap: 0.25rem;
		justify-content: space-around;
	}

	div {
		background-color: var(--button-background-color);
		font-size: 1rem;
		padding: 0.25em;
		width: 100%;

		&.active {
			border-color: #060d1f;
			filter: brightness(0.9);
		}

		&:first-child {
			border-bottom-left-radius: inherit;
			border-right: none;
			border-top-left-radius: inherit;
		}

		&:last-child {
			border-bottom-right-radius: inherit;
			border-left: none;
			border-top-right-radius: inherit;
		}
	}
</style>
