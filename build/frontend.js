/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/VehiclesPostLoop/index.js":
/*!***************************************!*\
  !*** ./src/VehiclesPostLoop/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_dashicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/dashicons */ "@wordpress/dashicons");
/* harmony import */ var _wordpress_dashicons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dashicons__WEBPACK_IMPORTED_MODULE_3__);





wp.blocks.registerBlockType("green-blocks/vehicles-post-loop", {
  title: "Vehicles Post Loop",
  icon: "dashicon dashicons-car",
  category: "common",
  attributes: {
    grid_width: {
      type: "string",
      default: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    },
    column_width: {
      type: "string",
      default: "col-span-1"
    },
    padding_top: {
      type: "string",
      default: "pt-16"
    },
    padding_bottom: {
      type: "string",
      default: "pb-16"
    },
    style: {
      type: "string",
      default: "text-slate-900 text-slate-50 border-slate-400"
    },
    button: {
      type: "string",
      default: "bg-slate-700 !text-slate-50 hover:!bg-slate-50 hover:!text-slate-700 hover:!border-slate-50"
    }
  },
  edit: function (props) {
    const {
      attributes,
      setAttributes
    } = props;
    const [vehicles, setVehicles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      async function fetchVehicles() {
        try {
          const res = await fetch("/?rest_route=/wp/v2/vehicle&per_page=5");
          const data = await res.json();
          const vehicleData = await Promise.all(data.map(async vehicle => {
            try {
              const res = await fetch(vehicle._links["wp:featuredmedia"][0].href);
              const data = await res.json();
              return {
                ...vehicle,
                featured_image: data.source_url
              };
            } catch (e) {
              /* In case there is no image, set featured_image property as null */
              return {
                ...vehicle,
                featured_image: null
              };
            }
          }));
          setVehicles(vehicleData);
        } catch (e) {
          // log error appropriately
        }
      }
      fetchVehicles();
    }, []);
    const onGridWidthChange = grid_width => {
      props.setAttributes({
        grid_width
      });
    };
    const onColumnWidthChange = column_width => {
      props.setAttributes({
        column_width
      });
    };
    const onPaddingTopChange = padding_top => {
      props.setAttributes({
        padding_top
      });
    };
    const onPaddingBottomChange = padding_bottom => {
      props.setAttributes({
        padding_bottom
      });
    };
    const onStyleToggleChange = style => {
      props.setAttributes({
        style
      });
    };
    const onButtonToggleChange = button => {
      props.setAttributes({
        button
      });
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      className: "mx-2",
      label: "Style",
      value: props.attributes.style,
      options: [{
        label: "Default",
        value: "text-slate-900 text-slate-50 border-slate-300"
      }, {
        label: "Dark",
        value: "text-slate-50 bg-slate-800 border-slate-600"
      }],
      onChange: onStyleToggleChange
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      className: "mx-2",
      label: "Button Style",
      value: props.attributes.button,
      options: [{
        label: "Dark Button",
        value: "bg-slate-700 !text-slate-50 hover:bg-slate-50 hover:!text-slate-700 hover:border-slate-50"
      }, {
        label: "Light Button",
        value: "bg-slate-50 !text-slate-700 hover:bg-slate-700 hover:!text-slate-50 hover:border-slate-700"
      }],
      onChange: onButtonToggleChange
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      className: "mx-2",
      label: "Post Width",
      value: props.attributes.grid_width,
      options: [{
        label: "Full Width",
        value: "grid-cols-1"
      }, {
        label: "Two Wide",
        value: "grid-cols-1  lg:grid-cols-2"
      }, {
        label: "Three Wide",
        value: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      }],
      onChange: onGridWidthChange
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      className: "mx-2",
      label: "Padding Top",
      value: props.attributes.padding_top,
      options: [{
        label: "Small",
        value: "pt-9"
      }, {
        label: "Medium",
        value: "pt-24"
      }, {
        label: "Large",
        value: "pt-36"
      }],
      onChange: onPaddingTopChange
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      className: "mx-2",
      label: "Padding Bottom",
      value: props.attributes.padding_bottom,
      options: [{
        label: "Small",
        value: "pb-9"
      }, {
        label: "Medium",
        value: "pb-24"
      }, {
        label: "Large",
        value: "pb-36"
      }],
      onChange: onPaddingBottomChange
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `!max-w-full w-full green-blocks-vehicle-posts px-6 justify-center mx-auto flex ${attributes.padding_top} ${attributes.padding_bottom} ${attributes.style}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `container grid gap-3 ${attributes.grid_width}`
    }, vehicles && vehicles.map(vehicle => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: vehicle.id,
      className: "border rounded-md p-5"
    }, vehicle.featured_image && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: vehicle.link
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "object-contain rounded-md hover:scale-105 transition-all duration-300 ease-in-out max-h-32",
      src: vehicle.featured_image,
      alt: vehicle.title.rendered
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "my-0"
    }, vehicle.title.rendered), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      class: "text-sm  mb-2 w-fit py-1 px-2 bg-slate-500 text-slate-50 rounded-md duration-200 ease-in-out transition hover:bg-slate-700"
    }, "Vehicle Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "text-sm mb-4"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      dangerouslySetInnerHTML: {
        __html: vehicle.excerpt.rendered
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: `text-sm border rounded-md py-2 px-4 !no-underline transition duration-200 ease-in-out ${attributes.button}`,
      href: vehicle.link,
      target: "_blank"
    }, "Read More"))))));
  },
  save: function (props) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.attributes && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", {
      style: {
        display: "none"
      }
    }, JSON.stringify(props.attributes)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `green-blocks-vehicle-posts container mx-auto ${props.attributes.padding_top} ${props.attributes.padding_bottom} ${props.attributes.style}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `${props.attributes.column_width}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `w-full grid ${props.attributes.grid_width}`
    }))));
  }
});

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/dashicons":
/*!***********************************!*\
  !*** external ["wp","dashicons"] ***!
  \***********************************/
/***/ (function(module) {

module.exports = window["wp"]["dashicons"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VehiclesPostLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VehiclesPostLoop */ "./src/VehiclesPostLoop/index.js");

}();
/******/ })()
;
//# sourceMappingURL=frontend.js.map