<template>
	<picture>
		<source
			:key="src.mime"
			:srcSet="src.path"
			:type="src.mime"
			v-for="src in srcList"
		/>
		<img :src="srcList.at(-1).path" alt="" />
	</picture>
</template>

<script setup>
	const path = process.env.VUE_APP_ASSETS_ENDPOINT + "background"
	const srcList = ["webp", "png"].map((fmt) => ({
		path: path + "." + fmt,
		mime: "image/" + fmt,
	}))
</script>

<style scoped>
	picture {
		position: fixed;
		height: 100vh;
		width: 100vw;
		z-index: -1;
	}

	img {
		object-fit: cover;
		height: inherit;
		width: inherit;
	}
</style>
