<template>
	<figure :style="{ cursor: exactCursor }">
		<picture class="portrait" :style="bgStyle" :class="meta?.colour" :alt="meta?.name || 'Character placeholder'">
			<source v-for="src in srcList" :key="src.mime" :srcSet="src.path" :type="src.mime">
			<img :src="srcList.at(-1).path">
		</picture>
		<element-badge v-if="meta" :elementId="meta.element" />
		<figcaption>{{ meta?.name || namePlaceholder || "Empty" }}</figcaption>
	</figure>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	import { useStore } from "vuex"

	import ElementBadge from "@/components/ElementBadge.vue"

	const store = useStore()

	const props = defineProps({ "characterId": String, "cursor": String, "namePlaceholder": String })

	const meta = computed(() => {
		return store.state.data.characters.find(c => c.id === props.characterId)
	})

	const srcList = computed(() => {
		const path = `${process.env.VUE_APP_ASSETS_ENDPOINT}portraits/${encodeURIComponent(meta.value?.name)}`
		return [
			{ path: path + ".webp", mime: "image/webp" },
			{ path: path + ".png", mime: "image/png" },
		]
	})

	const bgStyle = computed(() => {
		if (store.state.data.spritesheets === undefined) return {}

		const index = store.state.data.spritesheets.backgrounds.indices[meta.value?.colour || "grey"]

		return {
			backgroundImage:    `url(${process.env.VUE_APP_ASSETS_ENDPOINT}${store.state.data.spritesheets.backgrounds.path})`,
			backgroundPosition: `${index[0] * -100}% ${index[1] * -100}%`,
		}
	})

	const exactCursor = computed(() => {
		if (props.cursor === "removeOrDefault") return meta.value ? "not-allowed" : "default"

		return props.cursor
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

		picture.portrait {
			height: 5rem;
			width: 5rem;
			border-radius: inherit;
			border-bottom-right-radius: 20%;
			border-bottom-left-radius: 0;
			background-size: cover;

			img {
				height: inherit;
				width: inherit;
				border-radius: inherit;
			}

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
