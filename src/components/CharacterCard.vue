<template>
	<div v-if="meta" class="character-wrapper" :class="{ suggestion }">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})` }" :class="meta.colour" @click="clickHandler">
		<element-badge :elementId="meta.element" />
		<div>{{ meta.name }}</div>
	</div>
	<div v-else class="character-wrapper suggestion">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})` }" @click="clickHandler">
		<div>Auto</div>
	</div>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"
	import useAPI from "../hooks/api.js"

	import ElementBadge from "@/components/ElementBadge.vue"

	const store = useStore()
	const { getAssetURI } = useAPI()

	const props = defineProps({
		"characterId": { "type": String },
		"suggestion":  { "type": Boolean, "default": false },
		"pIndex":      { "type": Number },
		"cIndex":      { "type": Number },
	})

	const meta = computed(() => {
		return store.state.data.characters.find(c => c.id === props.characterId)
	})

	const src = computed(() => {
		return getAssetURI("portrait", meta.value.name)
	})

	const bgSrc = computed(() => {
		return getAssetURI("background", meta.value.colour)
	})
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
		cursor: pointer;

		* {
			user-select: none;
		}

		&.suggestion {
			filter: grayscale(75%);
		}

		& > div {
			padding: 0.25em 0;
			font-family: Hoyofont;
			font-size: 0.8em;
		}

		img:first-child {
			height: 5rem;
			width: 5rem;
			border-radius: inherit;
			border-bottom-right-radius: 20%;
			border-bottom-left-radius: 0;
			background-size: cover;

			&.red {
				background-color: #a54845;
			}

			&.purple {
				background-color: #8d72ba;
			}

			&.yellow {
				background-color: #ab7547;
			}
		}
	}
</style>
