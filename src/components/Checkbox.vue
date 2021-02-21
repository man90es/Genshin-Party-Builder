<template>
	<img v-if="value" @click="clickHandler" src="../assets/check_box_true.svg">
	<img v-else @click="clickHandler" src="../assets/check_box_false.svg">
</template>

<script>
	export default {
		name: 'Checkbox',
		props: ['value', 'clickHandler'],
	}
</script>

<style scoped>
	img {
		height: 1.5em;
		width: 1.5em;
		cursor: pointer;
		filter: invert(85%);
	}
</style>
