export default function() {
	const uri = `${process.env.VUE_APP_ASSETS_ENDPOINT}background.png`
	document.body.style.backgroundImage = `url(${uri})`
}
