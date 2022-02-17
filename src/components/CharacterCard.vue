<template>
	<figure v-if="meta" :style="{ cursor: cursor === 'removeOrDefault' ? 'not-allowed' : cursor }">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})` }" :class="meta.colour" :alt="meta.name" @click="clickHandler">
		<element-badge :elementId="meta.element" />
		<figcaption>{{ meta.name }}</figcaption>
	</figure>
	<figure v-else :style="{ cursor: cursor === 'removeOrDefault' ? 'default' : cursor }">
		<img :src="src" :style="{ backgroundImage: `url(${bgSrc})` }" alt="Character placeholder" @click="clickHandler">
		<figcaption>{{ namePlaceholder || "Empty" }}</figcaption>
	</figure>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"
	import useAPI from "../hooks/api.js"

	import ElementBadge from "@/components/ElementBadge.vue"

	const store = useStore()
	const { getAssetURI } = useAPI()

	const props = defineProps({ "characterId": String, "cursor": String, "namePlaceholder": String })

	const meta = computed(() => {
		return store.state.data.characters.find(c => c.id === props.characterId)
	})

	const src = computed(() => {
		return getAssetURI("portrait", meta.value?.name)
	})

	const bgSrc = computed(() => {
		return getAssetURI("background", meta.value?.colour || "grey")
	})
</script>

<style scoped lang="scss">
	figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		background-color: var(--button-background-color);
		color: var(--button-font-color);
		border-radius: 5%;
		margin: 0;

		cursor: inherit;

		* {
			user-select: none;
		}

		figcaption {
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
