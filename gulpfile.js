var gulp			= require('gulp'),
	browserSync 	= require('browser-sync'),
	plumber 		= require('gulp-plumber'),
	concat  		= require('gulp-concat'),
	jade 			= require('gulp-jade'),
	sass			= require('gulp-sass'),
	autoprefixer	= require('gulp-autoprefixer'),
	sourcemaps		= require('gulp-sourcemaps'),
	zip 			= require('gulp-zip'),
	minify 			= require('gulp-minify'),
	i18n			= require('gulp-html-i18n'),
	sitemap 		= require('gulp-sitemap');

//- Paths variables
var devJSPath 			= "dev/js/",
	devJSVendorPath 	= devJSPath + "vendor/",
	devJADEPath			= "dev/jade/*.jade",
	prodAssetsPath 		= "prod/assets/",
	protAssetsJSPath 	= prodAssetsPath + "js/";
var devSASSPath			= "dev/sass/",
	prodAssetsCSSPath	= prodAssetsPath + "css/";

//- Concat variables
var vendorJSConcat  = "vendor.min.js";
var pluginsJSConcat = "plugins.js";

//- Static Server
gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: 'prod'
        },
        ghostMode: false
    });
});

//- Vendor frameworks / helpers / plugins object
var vendorJSobject = {
	framework: {
		jquery: "jquery.min.js"
	},
	helpers: {
		browser: "browser.min.js",
		device: "device.min.js",
		placeholder: "jquery.placeholder.min.js",
		jqueryVisible: 'jquery.visible.min.js',
		tooltip: 'tooltip.js'
	}
}

//- Bootstrap plugins

var bootstrapJsObject = {
	bs: {
		util: 'bs.util.js',
		modal: 'bs.modal.js'
	}
}

//- Jade compiler
gulp.task('jade', function() {
	return gulp.src(devJADEPath)
	.pipe(plumber())
	.pipe(jade({
    	pretty: true
	}))
	.pipe(gulp.dest('prod'));
});

gulp.task('jade-i18n', function() {
	return gulp.src('dev/jade/en/*.jade')
	.pipe(plumber())
	.pipe(jade({
    	pretty: true
	}))
	.pipe(gulp.dest('prod/en'));
});

//- Javascript vendor
gulp.task('js-vendor', function() {
    return gulp.src([
            devJSVendorPath + vendorJSobject.framework.jquery,
            devJSVendorPath + vendorJSobject.helpers.browser,
            devJSVendorPath + vendorJSobject.helpers.device,
            devJSVendorPath + vendorJSobject.helpers.placeholder,
			devJSVendorPath + vendorJSobject.helpers.jqueryVisible,
			devJSVendorPath + vendorJSobject.helpers.tooltip
    ])
    .pipe(plumber())
    .pipe(concat(vendorJSConcat))
    .pipe(gulp.dest(protAssetsJSPath))
});

//- Javascript main
gulp.task('js-main', function() {
	return gulp.src(devJSPath + 'core.js')
		.pipe(plumber())
		.pipe(gulp.dest(protAssetsJSPath))
});

//- Javascript plugins
gulp.task('js-plugins', function() {
	return gulp.src([
		devJSPath + 'plugins/slick-slider/slick.js',
		devJSPath + 'plugins/slick-slider/init.js',
		devJSPath + 'plugins/tabs/tabs.js',
		devJSPath + 'plugins/accordions/accordions.js',
		devJSPath + 'plugins/parallax/skrollr.js',
		devJSPath + 'plugins/lightgallery/lightgallery.js',
		devJSPath + 'plugins/lightgallery/init.js',
		devJSPath + 'plugins/tooltipster/tooltipster.js',
		devJSPath + 'plugins/cookies-policy/cookies-policy.js',
		devJSPath + 'plugins/bootstrap/bs.util.js',
		devJSPath + 'plugins/bootstrap/bs.modal.js'
	])
	.pipe(plumber())
	.pipe(concat(pluginsJSConcat))
	.pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    }))
	.pipe(gulp.dest(protAssetsJSPath + 'plugins'))
});

//- Sass Bootstrap
gulp.task('sass-bootstrap', function() {
	return gulp.src(devSASSPath + 'bootstrap/bootstrap.scss')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('bootstrap.min.css'))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(prodAssetsCSSPath))
		.pipe(browserSync.stream());
})

//- Sass Site
gulp.task('sass-site', function() {
	return gulp.src(devSASSPath + 'site/style.scss')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(prodAssetsCSSPath))
		.pipe(browserSync.stream());
});

//- Sitemap
gulp.task('sitemap', function() {
	gulp.src('prod/*.html', {
		read: false
	})
	.pipe(sitemap({
		siteUrl: 'http://www.netmyk.pl'
	}))
	.pipe(gulp.dest('prod'))
});

//- Gulp copy images from DEV to PROD
gulp.task('copy', function() {
	gulp.src(['dev/images/*.jpg', 'dev/images/*.png', 'dev/images/**/*.png', 'dev/images/**/*.jpg'])
		.pipe(gulp.dest('prod/assets/images'))
});

//- Gulp copy fonts from DEV to prod
gulp.task('copy-fonts', function() {
	gulp.src(['dev/fonts/**/*.*'])
		.pipe(gulp.dest('prod/assets/fonts'))
});

//- Zip HTML {ignored by .gitignore}
gulp.task('zip', function() {
	return gulp.src('prod/**')
		.pipe(zip('pack.zip'))
		.pipe(gulp.dest(''));
})

//- i18n
gulp.task('build:localize', function() {
  var dest  = 'prod';
  var index = 'prod/*.html';
  return gulp.src(index)
    .pipe(i18n({
      langDir: 'lang',
      trace: true,
	  createLangDirs: true,
	  filenameI18n: true
    }))
    .pipe(gulp.dest(dest));
});

//- Gulp Watcher
gulp.task('watch', function() {
    gulp.watch('dev/jade/**/*.jade', ['jade']);
	gulp.watch('dev/jade/en/*.jade', ['jade-i18n']);
    gulp.watch('dev/sass/**/*.scss', ['sass-site']);
    gulp.watch('dev/sass/site/style.scss', ['sass-site']);
    gulp.watch('dev/js/vendor/*.js', ['js-vendor']);
    gulp.watch('dev/js/core.js', ['js-main']);
    gulp.watch('prod/**/*.html', browserSync.reload);
    gulp.watch('prod/assets/js/*.js', browserSync.reload);
	gulp.watch('prod/assets/js/**/*.js', browserSync.reload);
});

//- Gulp default
gulp.task('default', [
    'watch',
    'browser-sync'
]);
