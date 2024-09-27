let browserSupported = true;
try {
	eval("'use strict'; class C { async test(...args) { let spread = {...({a: 2})} }}");
	let canvas = document.createElement('canvas');
	browserSupported = !!(
		window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas
			.getContext(
				'experimental-webgl')) &&
		new Blob(["test"], {
			type: "text/plain"
		}).arrayBuffer
	);
} catch (e) {
	browserSupported = false;
}
if (browserSupported) {
	document.body.classList.remove("no-js");
	setTimeout(() => {
		let loader = document.getElementById("loader-wrapper");
		if (loader) {
			loader.style.display = "";
		}
	}, 2000);
} else {
	alert("Browser not supported.\n\nPlease download the latest Google Chrome, Mozilla Firefox or Microsoft Edge.");
}
SystemJS.config({
	packages: {
		"@puzzl": {
			defaultExtension: "js"
		},
		"@puzzl/core/lib/async/cancellation": {
			main: "index.js"
		},
		"@babel/runtime": {
			defaultExtension: "js"
		},
		"@babel/runtime/regenerator": {
			main: "index.js"
		},
		"regenerator-runtime": {
			main: "runtime.js"
		}
	},
	meta: {
		"web-audio-polyfill.js": {
			scriptLoad: true
		},
		"dist/7zz.js": {
			scriptLoad: true
		},
		"dist/fsalib.min.js": {
			scriptLoad: true
		},
		"dist/spbots.min.js": {
			scriptLoad: true
		}
	},
	paths: {
		"web-audio-polyfill.js": "dist/web-audio-polyfill.min.js",
		"7z-wasm": "dist/7zz.js",
		"@ffmpeg/ffmpeg": "dist/ffmpeg.min.js",
		"file-system-access": "dist/fsalib.min.js",
		"@chronodivide/sp-bots": "dist/spbots.min.js",
		"@chronodivide/game-api": "game/api/index",
	}
})
System.registerDynamic('three', [], false, function(require, exports, module) {
	module.exports = window.THREE;
});
if (browserSupported) {
	SystemJS.import("main");
	document.body.removeChild(document.getElementById("loader-wrapper"));
}