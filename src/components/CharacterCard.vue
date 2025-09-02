<template>
	<figure
		:class="{ owned: !notCollected }"
		:style="{ cursor: clickable ? 'pointer' : 'default' }"
	>
		<picture class="portrait">
			<img
				:alt="meta.name"
				:src="meta.icon"
				referrerpolicy="no-referrer"
				v-if="meta"
			/>
		</picture>
		<picture
			:class="meta?.background ?? 'grey'"
			class="bg"
			v-if="jsonData.assets?.portraitBg.length"
		>
			<source
				:key="src.type"
				:srcSet="src.src"
				:type="src.type"
				v-for="src in jsonData.assets?.portraitBg"
			/>
			<img
				:src="jsonData.assets?.portraitBg.at(-1)?.src"
				alt=""
			/>
		</picture>
		<div
			class="removeOverlay"
			v-if="'remove' === hoverIntention"
		>
			×
		</div>
		<ElementBadge
			:elementId="meta.element"
			v-if="meta"
		/>
		<ConstellationBadge
			:characterId="characterId"
			v-if="characterId"
		/>
		<figcaption>
			{{ truncate(meta?.name || props.namePlaceholder || "Empty", { length: 11 }) }}
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { ConstellationBadge, ElementBadge } from "@/components"
	import { truncate } from "lodash"
	import { useJsonDataStore } from "@/stores"

	const jsonData = useJsonDataStore()
	const props = defineProps<{
		characterId?: string | null
		clickable: boolean
		hoverIntention?: "pick" | "remove"
		namePlaceholder?: string
		notCollected?: boolean
	}>()

	const meta = computed(() => (
		props.characterId
			? jsonData.characters[props.characterId]
			: undefined
	))
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
		picture.bg {
			background-size: cover;
			border-radius: var(--outside-border-radius) var(--outside-border-radius) 1rem 0;
			height: 5rem;
			width: 5rem;

			img {
				border-radius: inherit;
				height: inherit;
				width: inherit;
			}
		}

		picture.bg {
			position: absolute;

			img {
				object-fit: cover;
			}

			&.grey {
				background-color: #838383;
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
