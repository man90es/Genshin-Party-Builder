<template>
	<div>
		<input type="button" value="-" @click="decrementHandler">
		C{{ value }}
		<input type="button" value="+" @click="incrementHandler">
	</div>
</template>

<script>
	export default {
		name: 'ConstellationInput',
		props: ['value', 'incrementHandler', 'decrementHandler'],
	}
</script>

<style scoped>
	img {
		height: 2em;
		width: 2em;
		cursor: pointer;
	}

	input {
		border: none;
		outline: none;
		background-color: #fff1;
		margin: 0 0.5em;
		height: 1.5em;
		width: 1.5em;
		color: white;
		border-radius: 10%;
		cursor: pointer;
	}
</style>
