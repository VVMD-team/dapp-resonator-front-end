/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/encrypt-file/route";
exports.ids = ["app/api/encrypt-file/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fencrypt-file%2Froute&page=%2Fapi%2Fencrypt-file%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fencrypt-file%2Froute.js&appDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fencrypt-file%2Froute&page=%2Fapi%2Fencrypt-file%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fencrypt-file%2Froute.js&appDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_max_Desktop_VVMD_dapp_resonator_front_end_gh_dapp_resonator_front_end_src_app_api_encrypt_file_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/encrypt-file/route.js */ \"(rsc)/./src/app/api/encrypt-file/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/encrypt-file/route\",\n        pathname: \"/api/encrypt-file\",\n        filename: \"route\",\n        bundlePath: \"app/api/encrypt-file/route\"\n    },\n    resolvedPagePath: \"/Users/max/Desktop/VVMD/dapp-resonator/front-end-gh/dapp-resonator-front-end/src/app/api/encrypt-file/route.js\",\n    nextConfigOutput,\n    userland: _Users_max_Desktop_VVMD_dapp_resonator_front_end_gh_dapp_resonator_front_end_src_app_api_encrypt_file_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZlbmNyeXB0LWZpbGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmVuY3J5cHQtZmlsZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmVuY3J5cHQtZmlsZSUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm1heCUyRkRlc2t0b3AlMkZWVk1EJTJGZGFwcC1yZXNvbmF0b3IlMkZmcm9udC1lbmQtZ2glMkZkYXBwLXJlc29uYXRvci1mcm9udC1lbmQlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbWF4JTJGRGVza3RvcCUyRlZWTUQlMkZkYXBwLXJlc29uYXRvciUyRmZyb250LWVuZC1naCUyRmRhcHAtcmVzb25hdG9yLWZyb250LWVuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDOEQ7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9tYXgvRGVza3RvcC9WVk1EL2RhcHAtcmVzb25hdG9yL2Zyb250LWVuZC1naC9kYXBwLXJlc29uYXRvci1mcm9udC1lbmQvc3JjL2FwcC9hcGkvZW5jcnlwdC1maWxlL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9lbmNyeXB0LWZpbGUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9lbmNyeXB0LWZpbGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2VuY3J5cHQtZmlsZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9tYXgvRGVza3RvcC9WVk1EL2RhcHAtcmVzb25hdG9yL2Zyb250LWVuZC1naC9kYXBwLXJlc29uYXRvci1mcm9udC1lbmQvc3JjL2FwcC9hcGkvZW5jcnlwdC1maWxlL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fencrypt-file%2Froute&page=%2Fapi%2Fencrypt-file%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fencrypt-file%2Froute.js&appDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/encrypt-file/route.js":
/*!*******************************************!*\
  !*** ./src/app/api/encrypt-file/route.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nfunction signatureToKeyIV(signature) {\n    const hexSignature = signature.slice(2);\n    const key = hexSignature.slice(0, 64);\n    const iv = hexSignature.slice(64, 96);\n    const keyBuffer = Buffer.from(key, \"hex\");\n    const ivBuffer = Buffer.from(iv, \"hex\");\n    return {\n        keyBuffer,\n        ivBuffer\n    };\n}\nasync function encryptFileSync(fileData, signature) {\n    const { keyBuffer, ivBuffer } = signatureToKeyIV(signature);\n    const cipher = crypto__WEBPACK_IMPORTED_MODULE_0___default().createCipheriv(\"aes-256-cbc\", keyBuffer, ivBuffer);\n    const encryptedData = Buffer.concat([\n        cipher.update(fileData),\n        cipher.final()\n    ]);\n    return encryptedData;\n}\nconst POST = async (req)=>{\n    const formData = await req.formData();\n    const file = formData.get(\"file\");\n    const signature = formData.get(\"signature\");\n    if (!file || !signature) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"No files received.\"\n        }, {\n            status: 400\n        });\n    }\n    const buffer = Buffer.from(await file.arrayBuffer());\n    const encryptedBuffer = await encryptFileSync(buffer, signature);\n    const blob = new Blob([\n        encryptedBuffer\n    ], {\n        type: file.type\n    });\n    try {\n        return new next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse(blob, {\n            status: 200,\n            statusText: \"OK\"\n        });\n    } catch (error) {\n        console.log(\"Error occured \", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            Message: \"Failed\",\n            status: 500\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9lbmNyeXB0LWZpbGUvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE0QjtBQUNlO0FBRTNDLFNBQVNFLGlCQUFpQkMsU0FBUztJQUNqQyxNQUFNQyxlQUFlRCxVQUFVRSxLQUFLLENBQUM7SUFFckMsTUFBTUMsTUFBTUYsYUFBYUMsS0FBSyxDQUFDLEdBQUc7SUFDbEMsTUFBTUUsS0FBS0gsYUFBYUMsS0FBSyxDQUFDLElBQUk7SUFDbEMsTUFBTUcsWUFBWUMsT0FBT0MsSUFBSSxDQUFDSixLQUFLO0lBQ25DLE1BQU1LLFdBQVdGLE9BQU9DLElBQUksQ0FBQ0gsSUFBSTtJQUVqQyxPQUFPO1FBQUVDO1FBQVdHO0lBQVM7QUFDL0I7QUFFQSxlQUFlQyxnQkFBZ0JDLFFBQVEsRUFBRVYsU0FBUztJQUNoRCxNQUFNLEVBQUVLLFNBQVMsRUFBRUcsUUFBUSxFQUFFLEdBQUdULGlCQUFpQkM7SUFFakQsTUFBTVcsU0FBU2QsNERBQXFCLENBQUMsZUFBZVEsV0FBV0c7SUFFL0QsTUFBTUssZ0JBQWdCUCxPQUFPUSxNQUFNLENBQUM7UUFDbENILE9BQU9JLE1BQU0sQ0FBQ0w7UUFDZEMsT0FBT0ssS0FBSztLQUNiO0lBRUQsT0FBT0g7QUFDVDtBQUVPLE1BQU1JLE9BQU8sT0FBT0M7SUFDekIsTUFBTUMsV0FBVyxNQUFNRCxJQUFJQyxRQUFRO0lBRW5DLE1BQU1DLE9BQU9ELFNBQVNFLEdBQUcsQ0FBQztJQUMxQixNQUFNckIsWUFBWW1CLFNBQVNFLEdBQUcsQ0FBQztJQUUvQixJQUFJLENBQUNELFFBQVEsQ0FBQ3BCLFdBQVc7UUFDdkIsT0FBT0YscURBQVlBLENBQUN3QixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFxQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMxRTtJQUVBLE1BQU1DLFNBQVNuQixPQUFPQyxJQUFJLENBQUMsTUFBTWEsS0FBS00sV0FBVztJQUVqRCxNQUFNQyxrQkFBa0IsTUFBTWxCLGdCQUFnQmdCLFFBQVF6QjtJQUV0RCxNQUFNNEIsT0FBTyxJQUFJQyxLQUFLO1FBQUNGO0tBQWdCLEVBQUU7UUFDdkNHLE1BQU1WLEtBQUtVLElBQUk7SUFDakI7SUFFQSxJQUFJO1FBQ0YsT0FBTyxJQUFJaEMscURBQVlBLENBQUM4QixNQUFNO1lBQUVKLFFBQVE7WUFBS08sWUFBWTtRQUFLO0lBQ2hFLEVBQUUsT0FBT1IsT0FBTztRQUNkUyxRQUFRQyxHQUFHLENBQUMsa0JBQWtCVjtRQUM5QixPQUFPekIscURBQVlBLENBQUN3QixJQUFJLENBQUM7WUFBRVksU0FBUztZQUFVVixRQUFRO1FBQUk7SUFDNUQ7QUFDRixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvbWF4L0Rlc2t0b3AvVlZNRC9kYXBwLXJlc29uYXRvci9mcm9udC1lbmQtZ2gvZGFwcC1yZXNvbmF0b3ItZnJvbnQtZW5kL3NyYy9hcHAvYXBpL2VuY3J5cHQtZmlsZS9yb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5mdW5jdGlvbiBzaWduYXR1cmVUb0tleUlWKHNpZ25hdHVyZSkge1xuICBjb25zdCBoZXhTaWduYXR1cmUgPSBzaWduYXR1cmUuc2xpY2UoMik7XG5cbiAgY29uc3Qga2V5ID0gaGV4U2lnbmF0dXJlLnNsaWNlKDAsIDY0KTtcbiAgY29uc3QgaXYgPSBoZXhTaWduYXR1cmUuc2xpY2UoNjQsIDk2KTtcbiAgY29uc3Qga2V5QnVmZmVyID0gQnVmZmVyLmZyb20oa2V5LCBcImhleFwiKTtcbiAgY29uc3QgaXZCdWZmZXIgPSBCdWZmZXIuZnJvbShpdiwgXCJoZXhcIik7XG5cbiAgcmV0dXJuIHsga2V5QnVmZmVyLCBpdkJ1ZmZlciB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbmNyeXB0RmlsZVN5bmMoZmlsZURhdGEsIHNpZ25hdHVyZSkge1xuICBjb25zdCB7IGtleUJ1ZmZlciwgaXZCdWZmZXIgfSA9IHNpZ25hdHVyZVRvS2V5SVYoc2lnbmF0dXJlKTtcblxuICBjb25zdCBjaXBoZXIgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyaXYoXCJhZXMtMjU2LWNiY1wiLCBrZXlCdWZmZXIsIGl2QnVmZmVyKTtcblxuICBjb25zdCBlbmNyeXB0ZWREYXRhID0gQnVmZmVyLmNvbmNhdChbXG4gICAgY2lwaGVyLnVwZGF0ZShmaWxlRGF0YSksXG4gICAgY2lwaGVyLmZpbmFsKCksXG4gIF0pO1xuXG4gIHJldHVybiBlbmNyeXB0ZWREYXRhO1xufVxuXG5leHBvcnQgY29uc3QgUE9TVCA9IGFzeW5jIChyZXEpID0+IHtcbiAgY29uc3QgZm9ybURhdGEgPSBhd2FpdCByZXEuZm9ybURhdGEoKTtcblxuICBjb25zdCBmaWxlID0gZm9ybURhdGEuZ2V0KFwiZmlsZVwiKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gZm9ybURhdGEuZ2V0KFwic2lnbmF0dXJlXCIpO1xuXG4gIGlmICghZmlsZSB8fCAhc2lnbmF0dXJlKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTm8gZmlsZXMgcmVjZWl2ZWQuXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKSk7XG5cbiAgY29uc3QgZW5jcnlwdGVkQnVmZmVyID0gYXdhaXQgZW5jcnlwdEZpbGVTeW5jKGJ1ZmZlciwgc2lnbmF0dXJlKTtcblxuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2VuY3J5cHRlZEJ1ZmZlcl0sIHtcbiAgICB0eXBlOiBmaWxlLnR5cGUsXG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoYmxvYiwgeyBzdGF0dXM6IDIwMCwgc3RhdHVzVGV4dDogXCJPS1wiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJlZCBcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IE1lc3NhZ2U6IFwiRmFpbGVkXCIsIHN0YXR1czogNTAwIH0pO1xuICB9XG59O1xuIl0sIm5hbWVzIjpbImNyeXB0byIsIk5leHRSZXNwb25zZSIsInNpZ25hdHVyZVRvS2V5SVYiLCJzaWduYXR1cmUiLCJoZXhTaWduYXR1cmUiLCJzbGljZSIsImtleSIsIml2Iiwia2V5QnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsIml2QnVmZmVyIiwiZW5jcnlwdEZpbGVTeW5jIiwiZmlsZURhdGEiLCJjaXBoZXIiLCJjcmVhdGVDaXBoZXJpdiIsImVuY3J5cHRlZERhdGEiLCJjb25jYXQiLCJ1cGRhdGUiLCJmaW5hbCIsIlBPU1QiLCJyZXEiLCJmb3JtRGF0YSIsImZpbGUiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJidWZmZXIiLCJhcnJheUJ1ZmZlciIsImVuY3J5cHRlZEJ1ZmZlciIsImJsb2IiLCJCbG9iIiwidHlwZSIsInN0YXR1c1RleHQiLCJjb25zb2xlIiwibG9nIiwiTWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/encrypt-file/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fencrypt-file%2Froute&page=%2Fapi%2Fencrypt-file%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fencrypt-file%2Froute.js&appDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmax%2FDesktop%2FVVMD%2Fdapp-resonator%2Ffront-end-gh%2Fdapp-resonator-front-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();