module.exports = {
	publicPath: process.env.NODE_ENV === "production"
		? process.env.VUE_APP_PUBLIC_PATH || "/genshin-party-builder/"
		: "/"
}
