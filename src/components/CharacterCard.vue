<template>
	<figure :style="{ cursor: exactCursor }">
		<picture class="portrait" :alt="meta?.name || 'Character placeholder'">
			<source v-for="src in srcList" :key="src.mime" :srcSet="src.path" :type="src.mime">
			<img :src="srcList.at(-1).path">
		</picture>
		<picture class="background" :class="colour" v-if="bgSrcList.length > 0">
			<source v-for="src in bgSrcList" :key="src.mime" :srcSet="src.path" :type="src.mime">
			<img :src="bgSrcList.at(-1).path" :style="{ objectPosition: bgOffset }">
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

	const bgSrcList = computed(() => {
		if (store.state.data.spritesheets === undefined) return []

		const path = process.env.VUE_APP_ASSETS_ENDPOINT + store.state.data.spritesheets.backgrounds.filePath
		return store.state.data.spritesheets.backgrounds.extensions.map(f => ({ path: path + "." + f, mime: "image/" + f }))
	})

	const colour = computed(() => {
		return meta.value?.colour || "grey"
	})

	const bgOffset = computed(() => {
		if (store.state.data.spritesheets === undefined) return ""

		const index = store.state.data.spritesheets.backgrounds.indices[colour.value]

		return `${index[0] * 100 / 3}%`
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

		picture.portrait,
		picture.background {
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
				image-rendering: -webkit-optimize-contrast;
			}
		}

		picture.background {
			position: absolute;

			img {
				object-fit: cover;
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

		picture.portrait {
			z-index: 1;
		}
	}
</style>
