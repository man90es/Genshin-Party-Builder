<template>
	<div id="popup-wrapper">
		<div id="popup">
			<h2>{{ headline }}</h2>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	defineProps({ headline: String })
</script>

<style lang="scss" scoped>
	#popup-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;

		background-color: #1117;
	}

	#popup {
		background-color: #1c1c1c;
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;
		border-radius: 0.5em;

		h2 {
			margin: 0;
			text-align: center;
		}
	}
</style>
