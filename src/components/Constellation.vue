<template>
	<div :style="{ opacity: level !== null ? 1 : 0 }">C{{ level }}</div>
</template>

<script>
	export default {
		name: 'Constellation',
		props: ['level']
	}
</script>

<style scoped>
	div {
		height: 1rem;
		width: 1rem;
		padding: 0.25rem;
		border-radius: 50%;
		border: 0.15rem solid #fff;
		background-color: #000;
		font-size: 0.8rem;
		line-height: 1.1rem;
		color: #fff;
	}
</style>
