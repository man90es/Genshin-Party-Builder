<template>
	<div v-if="meta.name" class="character-wrapper" :class="{ clickable, suggestion }">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})`, backgroundColor: meta.colour }" @click="clickHandler">
		<Element :elementId="meta.element" />
		<div>{{ meta.name }}</div>
	</div>
	<div v-else class="character-wrapper clickable suggestion">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})`, backgroundColor: meta.colour }" @click="clickHandler">
		<div>Auto</div>
	</div>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"
	import useAPI from "../hooks/api.js"
	import Element from "./Element.vue"

	const store = useStore()
	const { getAssetURI } = useAPI()

	const props = defineProps({
		"characterID": { "type": String },
		"suggestion":  { "type": Boolean, "default": false },
		"clickable":   { "type": Boolean, "default": false },
		"pIndex":      { "type": Number },
		"cIndex":      { "type": Number },
	})

	const meta = computed(() => {
		return store.state.data.characters.find(c => c.id === props.characterID) || { colour: "grey" }
	})

	const src = computed(() => {
		return getAssetURI("portrait", meta.value.name)
	})

	const bgSrc = computed(() => {
		return getAssetURI("background", meta.value.colour)
	})

	function clickHandler() {
		if (props.clickable) {
			window.mitt.emit('character-clicked', {
				pIndex: props.pIndex,
				cIndex: props.cIndex,
				cID:    meta.value.id,
			})
		}
	}
</script>

<style scoped lang="scss">
	.character-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		background-color: var(--button-background-color);
		color: var(--button-font-color);
		border-radius: 5%;

		&.suggestion {
			filter: grayscale(75%);
		}

		&.clickable {
			cursor: pointer;
		}

		& > div {
			padding: 0.25em 0;
			font-size: 0.9em;
		}

		img:first-child {
			height: 6em;
			width: 6em;
			border-radius: inherit;
			border-bottom-right-radius: 20%;
			border-bottom-left-radius: 0;
			background-size: cover;
		}
	}
</style>
