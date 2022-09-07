<template>
	<div id="popup-wrapper">
		<div id="popup">
			<h2>{{ headline }}</h2>
			<hr />
			<slot />
			<hr />
			<div class="row">
				<button v-if="showCancel" class="dark" @click="emit('cancel')">
					{{ cancelText }}
				</button>
				<button v-if="showAccept" class="dark" @click="emit('accept')">
					{{ acceptText }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const emit = defineEmits(["accept", "cancel"])

	defineProps({
		acceptText: { default: "Accept", type: String },
		cancelText: { default: "Cancel", type: String },
		headline: String,
		showAccept: { default: true, type: Boolean },
		showCancel: { default: true, type: Boolean },
	})
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
		align-items: center;
		background-color: #e5e1dc;
		border-radius: 0.5em;
		color: #495467;
		display: flex;
		flex-direction: column;
		font-family: Hoyofont;
		gap: 1em;
		padding: 1em;

		h2 {
			font-size: 1.75em;
			font-weight: normal;
			margin: 0;
			text-align: center;
		}

		hr {
			background-color: #d9d2c7;
			border: none;
			height: 0.2em;
			width: 90%;
		}

		button {
			padding: 0 2em;
		}
	}
</style>
