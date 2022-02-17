import useAPI from "@/hooks/api.js"

export default function() {
	const { getBackgroundURI } = useAPI()

	const uri = getBackgroundURI()
	document.body.style.backgroundImage = `url(${uri})`
}
