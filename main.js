/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const searchbtn = document.querySelector(\".searchbtn\");\n\nconst backgroundImage = ()=>{\n    let myImage = new Image();\n    myImage.src = image;\n    Document.body.append(myImage.src);\n}\nbackgroundImage();\nasync function getWeatherApi(url){\n    const response = await fetch(url, {\n        mode: \"cors\"\n      });\n      let responses = await response.json();\n      return responses;\n}\n\nasync function loadJson(){\n    let getLocation = document.querySelector(\"#search\").value;\n    let weatherApi =  getWeatherApi(`https://api.openweathermap.org/data/2.5/weather?q=${getLocation}&units=metric&appid=faa4a0770c3a396ae2aa2262e23c2e0c`,{\n        mode:\"cors\"\n    });\n    let weatherData = await weatherApi;\n    console.log(weatherData)\n}\n\nsearchbtn.addEventListener(\"click\", loadJson);\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;