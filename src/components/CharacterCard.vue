<template>
	<figure :class="{ owned }" :style="{ cursor: clickable ? 'pointer' : 'default' }">
		<picture class="portrait">
			<source :key="src.mime" :srcSet="src.path" :type="src.mime" v-for="src in srcList" />
			<img :src="srcList.at(-1)?.path" :alt="meta?.name || 'Character placeholder'" />
		</picture>
		<picture class="background" :class="colour" v-if="bgSrcList.length > 0">
			<source :key="src.mime" :srcSet="src.path" :type="src.mime" v-for="src in bgSrcList" />
			<img :src="bgSrcList.at(-1)?.path" :style="{ objectPosition: bgOffset }" alt="" />
		</picture>
		<div class="removeOverlay" v-if="'remove' === hoverIntention">×</div>
		<ElementBadge v-if="meta" :elementId="meta.element" />
		<ConstellationBadge :characterId="characterId" />
		<figcaption>
			{{ meta?.name || props.namePlaceholder || "Empty" }}
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { ConstellationBadge, ElementBadge } from "@/components"
	import { useJsonDataStore } from "@/stores"

	const jsonData = useJsonDataStore()
	const props = defineProps({
		characterId: { required: false, type: String },
		clickable: { default: true, type: Boolean },
		hoverIntention: { default: "pick", type: String },
		namePlaceholder: String,
		owned: { default: true, type: Boolean },
	})

	const meta = computed(() => (
		props.characterId
			? jsonData.characters[props.characterId]
			: undefined
	))
	const srcList = computed(() => {
		const path =
			process.env.VUE_APP_ASSETS_ENDPOINT +
			"portraits/" +
			encodeURIComponent(meta.value?.name ?? "undefined")

		return [
			{ path: path + ".webp", mime: "image/webp" },
			{ path: path + ".png", mime: "image/png" },
		]
	})

	const bgSrcList = computed(() => {
		if (undefined === jsonData.spritesheets) {
			return []
		}

		const path =
			process.env.VUE_APP_ASSETS_ENDPOINT +
			jsonData.spritesheets.backgrounds?.path

		return (
			jsonData.spritesheets.backgrounds?.extensions.map((f) => ({
				path: path + "." + f,
				mime: "image/" + f,
			})) || []
		)
	})

	const colour = computed(() => meta.value?.background || "grey")

	const bgOffset = computed(() => {
		if (undefined === jsonData.spritesheets) {
			return ""
		}

		const idx = jsonData.spritesheets.backgrounds.indices[colour.value]
		return `${(idx[0] * 100) / 3}%`
	})
</script>

<style scoped lang="scss">
	figure {
		--outside-border-radius: 5%;

		align-items: center;
		background-color: var(--button-background-color);
		border-radius: var(--outside-border-radius);
		color: var(--button-font-color);
		display: flex;
		flex-direction: column;
		margin: 0;
		position: relative;

		&:not(.owned) {
			filter: saturate(0.25) brightness(0.75);
		}

		* {
			user-select: none;
		}

		figcaption {
			font: 0.7rem Hoyofont;
			padding: 0.2rem 0;
		}

		picture.portrait,
		picture.background {
			background-size: cover;
			border-radius: var(--outside-border-radius) var(--outside-border-radius) 20% 0;
			height: 5rem;
			width: 5rem;

			img {
				border-radius: inherit;
				height: inherit;
				width: inherit;
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

		.removeOverlay {
			align-items: center;
			background-color: #0005;
			color: #fff;
			display: flex;
			font-size: 3em;
			inset: 0;
			justify-content: center;
			opacity: 0;
			position: absolute;
			transition-duration: 0.2s;
			z-index: 2;
		}

		&:hover .removeOverlay {
			opacity: 1;
		}
	}
</style>
