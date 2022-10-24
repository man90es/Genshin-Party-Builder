<template>
	<div>
		<button
			:class="{ active: option.value === modelValue }"
			:key="option.value"
			@click="selectValue(option.value)"
			type="button"
			v-for="option of options"
		>
			{{option.label}}
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
		background-color: transparent;
		display: flex;
		gap: 0.25rem;
		justify-content: space-around;
	}

	button {
		background-color: var(--button-background-color);
		font-size: 1rem;
		padding: 0.25em;
		width: 100%;

		&.active {
			border-color: #060d1f;
			filter: brightness(0.9);
		}

		&:first-child {
			border-bottom-right-radius: 0;
			border-right: none;
			border-top-right-radius: 0;
		}

		&:not(:first-child):not(:last-child) {
			border-left: none;
			border-radius: 0 !important;
			border-right: none;
		}

		&:last-child {
			border-bottom-left-radius: 0;
			border-left: none;
			border-top-left-radius: 0;
		}
	}
</style>
