<template>
	<div>
		<button
			:class="{ active: option.value === modelValue }"
			:key="option.value"
			@click="selectValue(option.value)"
			type="button"
			v-for="option of options"
		>
			{{ option.label }}
		</button>
	</div>
</template>

<script setup>
	defineProps({
		modelValue: {
			required: true,
		},
		options: {
			default: () => [
				{
					label: "No",
					value: false,
				},
				{
					label: "Yes",
					value: true,
				},
			],
			type: Array,
		},
	})

	const emit = defineEmits(["update:modelValue"])

	function selectValue(value) {
		emit("update:modelValue", value)
	}
</script>

<style lang="scss" scoped>
	div {
		--border-radius: 2rem;

		background-color: transparent;
		display: flex;
		gap: 0.25rem;
		justify-content: space-around;
	}

	button {
		background-color: var(--button-background-color);
		border-radius: 0;
		border: 0.05em solid transparent;
		font-size: 1rem;
		padding: 0.25em;
		transition-duration: 0.2s;
		width: 100%;

		&.active {
			border-color: #060d1f;
			filter: brightness(0.9);
		}

		&:first-child {
			border-radius: var(--border-radius) 0 0 var(--border-radius);
		}

		&:last-child {
			border-radius: 0 var(--border-radius) var(--border-radius) 0;
		}
	}
</style>
