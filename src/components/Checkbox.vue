<template>
	<img v-if="value" class="checked" @click="clickHandler" src="../assets/check_box_true.svg">
	<img v-else @click="clickHandler" src="../assets/check_box_false.svg">
</template>

<script>
	export default {
		name: 'Checkbox',
		props: ['value', 'clickHandler'],
	}
</script>

<style scoped lang="scss">
	img {
		height: 1.5em;
		width: 1.5em;
		cursor: pointer;
		filter: invert(85%);

		&.checked {
			filter: invert(85%) sepia(100%) saturate(4) hue-rotate(45deg);
		}
	}
</style>
