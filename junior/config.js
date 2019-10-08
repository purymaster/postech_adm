// Path
const src = 'src',
	dev = 'dev',
	srcPath = {
		html: `${src}/**/*.html`,
		css: `${src}/css/*.css`,
		font: `${src}/fonts/*`,
		js: `${src}/js/*.js`,
		img: `${src}/img/**/*.{png,jpg,jpeg,gif,svg}`,
		include: `${src}/inc/`
	},
	devPath = {
		html: `${dev}/`,
		css: `${dev}/css/`,
		font: `${dev}/fonts/`,
		js: `${dev}/js/`,
		img: `${dev}/img/`,
		include: `${dev}/inc/`
	};

module.exports = {
	src,
	dev,
	srcPath,
	devPath
}