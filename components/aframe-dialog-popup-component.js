/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";


    /**
     * @file index.js
     * Contains code that registers a dialog popup component.
     */
    
    /* global AFRAME */
    if (typeof AFRAME === 'undefined') {
      throw new Error('Component attempted to register before AFRAME was available.');
    }
    /**
     * Dialog Popup component for A-Frame.
     */
    
    
    AFRAME.registerComponent('dialog-popup', {
      schema: {
        titleAlign: {
          default: 'center'
        },
        addAttribute: {
          type: 'string',
          default: 'lal'
        },
        addAttrValue: {
          type: 'string',
          default: ''
        },
        aclass: {
            type: 'string',
            default: 'interractible'
        },
        title: {
          type: 'string',
          default: 'New Dialog'
        },
        titleColor: {
          type: 'string',
          default: 'black'
        },
        titleFont: {
          type: 'string',
          default: 'mozillavr'
        },
        titleWrapCount: {
          type: 'number',
          default: 24
        },
        body: {
          type: 'string',
          default: 'This dialog has no body yet.'
        },
        bodyColor: {
          type: 'string',
          default: 'black'
        },
        bodyFont: {
          type: 'string',
          default: 'mozillavr'
        },
        bodyWrapCount: {
          type: 'number',
          default: 30
        },
        openOn: {
          type: 'string',
          default: 'click'
        },
        active: {
          type: 'boolean',
          default: true
        },
        openIconImage: {
          type: 'string',
          default: ''
        },
        openIconRadius: {
          type: 'number',
          default: 0.35
        },
        openIconColor: {
          type: 'string',
          default: 'white'
        },
        closeIconImage: {
          type: 'asset',
          default: ''
        },
        closeIconRadius: {
          type: 'number',
          default: 0.3
        },
        closeIconColor: {
          type: 'string',
          default: 'white'
        },
        image: {
          type: 'string',
          default: ''
        },
        imageWidth: {
          type: 'number',
          default: 2
        },
        imageHeight: {
          type: 'number',
          default: 2
        },
        dialogBoxWidth: {
          type: 'number',
          default: 8
        },
        dialogBoxHeight: {
          type: 'number',
          default: 10
        },
        dialogBoxColor: {
          type: 'string',
          default: 'white'
        },
        dialogBoxPadding: {
          type: 'number',
          default: 0.4
        }
      },
      multiple: true,
      dialogPlaneEl: null,
      openIconEl: null,
      closeIconEl: null,
      titleEl: null,
      bodyEl: null,
      imageEl: null,
      hasImage: false,
    
      /**
       * Spawns the entities required to support this dialog.
       */
      init: function init() {
        this.cameraEl = document.querySelector('[camera]');
        this.spawnEntities();
        this.el.emit('loaded');
      },
    
      /**
       * If the component is open, ensure it always faces the camera.
       */
      tick: function tick() {
        if (this.isOpen) {
          this.positionDialogPlane();
        }
      },
    
      /**
       * When this component is removed, destruct event listeners.
       */
      remove: function remove() {
        var openOn = this.data.openOn;
        this.openIconEl.removeEventListener(openOn, this.toggleDialogOpen.bind(this));
        this.closeIconEl.removeEventListener(openOn, this.toggleDialogOpen.bind(this));
      },
    
      /**
       * When this component is updated, re-calculate title, body, image, and
       * dialog plane to incorporate changes.
       */
      update: function update() {
        this.generateTitle();
        this.generateBody();
        this.generateImage();
      },
    
      /**
       * Handles opening and closing the dialog plane.
       */
      toggleDialogOpen: function toggleDialogOpen() {
        this.isOpen = !this.isOpen;
    
        if (this.data.active && this.dialogPlaneEl) {
          // this.positionDialogPlane();
          this.dialogPlaneEl.setAttribute('visible', this.isOpen);
          this.openIconEl.setAttribute('visible', !this.isOpen);
          let info = document.getElementsByClassName("info");
          for (let i=0; i<info.length; i++) {
            if (info[i] == this.el) continue;
            info[i].setAttribute('visible', !this.isOpen)
          }
        }
      },
    
      /**
       * Generates the open icon.
       */
      generateOpenIcon: function generateOpenIcon() {
        var _this$data = this.data,
            radius = _this$data.openIconRadius,
            color = _this$data.openIconColor,
            src = _this$data.openIconImage,
            openOn = _this$data.openOn;
        var openIcon = document.createElement('a-entity');
        openIcon.classList.add(this.data.aclass);
        openIcon.setAttribute('id', "".concat(this.el.getAttribute('id'), "--open-icon"));
        openIcon.setAttribute('position', Object.assign({}, this.el.getAttribute('position')));
        openIcon.setAttribute('geometry', {
          primitive: 'circle',
          radius: radius
        });
        console.log("hehe", _this$data.addAttribute);
        if (_this$data.addAttribute)
          openIcon.setAttribute(_this$data.addAttribute, this.data.addAttrValue);

        openIcon.setAttribute('material', {
          color: color,
          shader: "flat",
          src: src
        }); // If the parent entity has aa look-at component attached, apply the look-at
        // component to the openIcon.
        this.addAnimation(openIcon);

        var lookAt = this.el.getAttribute('look-at');
    
        if (lookAt) {
          openIcon.setAttribute('look-at', lookAt);
        }
    
        openIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
        this.openIconEl = openIcon;
        return openIcon;
      },
    
      /**
       * Generates the close icon.
       */
      generateCloseIcon: function generateCloseIcon() {
        var _this$data2 = this.data,
            radius = _this$data2.closeIconRadius,
            color = _this$data2.closeIconColor,
            src = _this$data2.closeIconImage,
            width = _this$data2.dialogBoxWidth,
            height = _this$data2.dialogBoxHeight,
            openOn = _this$data2.openOn;
        var closeIcon = document.createElement('a-entity');
        closeIcon.classList.add(this.data.aclass);
        closeIcon.setAttribute('id', "".concat(this.el.getAttribute('id'), "--close-icon"));
        closeIcon.setAttribute('position', {
          x: 0,
          y: -height * 0.51,
          z: 0.01
        });
        closeIcon.setAttribute('geometry', {
          primitive: 'plane',
          width: 7.225,
          height: 0.85
        });
        closeIcon.setAttribute('material', {
          color: color,
          shader: "flat",
          transparent: true,
          src: src
        });
        this.addAnimation(closeIcon,1.05);

        closeIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
        this.closeIconEl = closeIcon;
        return closeIcon;
      },
    
      /**
       * Generates the title text.
       */
      generateTitle: function generateTitle() {
        var _this$data3 = this.data,
            value = _this$data3.title,
            color = _this$data3.titleColor,
            font = _this$data3.titleFont,
            wrapCount = _this$data3.titleWrapCount,
            width = _this$data3.dialogBoxWidth,
            height = _this$data3.dialogBoxHeight,
            padding = _this$data3.dialogBoxPadding,
            imageHeight = _this$data3.imageHeight;
        var title = this.titleEl || document.createElement('a-entity');
        title.setAttribute('id', "".concat(this.el.getAttribute('id'), "--title"));
        title.setAttribute('text', {
          value: value,
          // value: value.substring(0, wrapCount),
          color: color,
          font: font,
          negate: "false",
          wrapCount: wrapCount,
          width: width - padding * 2,
          baseline: 'top',
          anchor: 'left',
          align: this.data.titleAlign
        });
        var y = height / 2 - padding;
    
        if (this.hasImage) {
          y -= imageHeight / 2;
        }
    
        title.setAttribute('position', {
          x: -(width / 2) + padding,
          y: y,
          z: 0.01
        });
        this.titleEl = title;
        return title;
      },
    
      /**
       * Generates the body text entity.
       */
      generateBody: function generateBody() {
        var _this$data4 = this.data,
            value = _this$data4.body,
            color = _this$data4.bodyColor,
            font = _this$data4.bodyFont,
            wrapCount = _this$data4.bodyWrapCount,
            width = _this$data4.dialogBoxWidth,
            height = _this$data4.dialogBoxHeight,
            padding = _this$data4.dialogBoxPadding,
            imageHeight = _this$data4.imageHeight;
        var body = this.bodyEl || document.createElement('a-entity');
        body.setAttribute('id', "".concat(this.el.getAttribute('id'), "--title"));
        body.setAttribute('text', {
          value: value,
          color: color,
          font: font,
          negate: false,
          wrapCount: wrapCount,
          width: width - padding * 2,
          baseline: 'top',
          anchor: 'left'
        });

        // console.log("thight", body.object3D  );
        var y = height / 2 - padding * 3;
        if (this.data.title.length > this.data.titleWrapCount) {
          // console.log("123",  Math.round(this.data.title.length/ this.data.titleWrapCount) );
          y = height / 2 - padding * (2 + Math.round(this.data.title.length/ this.data.titleWrapCount));
        }
    
        if (this.hasImage) {
          y -= imageHeight / 2;
        }
    
        body.setAttribute('position', {
          x: -(width / 2) + padding,
          y: y,
          z: 0.01
        });
        this.bodyEl = body;
        return body;
      },
    
      /**
       * Generates the image entity.
       */
      generateImage: function generateImage() {
        var _this$data5 = this.data,
            src = _this$data5.image,
            width = _this$data5.imageWidth,
            height = _this$data5.imageHeight,
            dialogBoxHeight = _this$data5.dialogBoxHeight;
    
        if (!src.length) {
          return null;
        }
    
        var image = this.imageEl || document.createElement('a-image');
        image.setAttribute('id', "".concat(this.el.getAttribute('id'), "--image"));
        image.setAttribute('src', src);
        image.setAttribute('width', width);
        image.setAttribute('height', height);
        image.setAttribute('position', {
          x: 0,
          y: dialogBoxHeight / 2,
          z: 0.01
        });
        this.hasImage = true;
        this.imageEl = image;
        return image;
      },
    
      /**
       * Generates the dialog plane.
       */
      generateDialogPlane: function generateDialogPlane() {
        var _this$data6 = this.data,
            width = _this$data6.dialogBoxWidth,
            height = _this$data6.dialogBoxHeight + 1.5,
            padding = _this$data6.dialogBoxPadding,
            color = _this$data6.dialogBoxColor;
        var plane = this.dialogPlaneEl || document.createElement('a-entity');
        plane.setAttribute('id', "".concat(this.el.getAttribute('id'), "--dialog-plane"));
        plane.setAttribute('position', Object.assign({}, this.el.getAttribute('position')));
        plane.setAttribute('visible', false);
        plane.setAttribute('geometry', {
          primitive: 'plane',
          width: width + padding,
          height: height + padding
        });
        var image = this.generateImage();
    
        if (image) {
          plane.appendChild(this.generateImage());
        }
    
        plane.setAttribute('material', {
          shader: "flat",
          color: color
        });
        plane.appendChild(this.generateCloseIcon());
        plane.appendChild(this.generateTitle());
        plane.appendChild(this.generateBody());
        this.dialogPlaneEl = plane;

        // var objo = plane.getObject3D('mesh');

        // // compute bounding box
        // var bbox = new THREE.Box3().setFromObject(objo);
        // console.log("bbox", bbox.min, bbox.max);
        return plane;
      },
      positionDialogPlane: function positionDialogPlane() {
        if (this.dialogPlaneEl) {
          var vector = this.dialogPlaneEl.object3D.parent.worldToLocal(this.cameraEl.object3D.getWorldPosition());
          var vector2 = this.dialogPlaneEl.object3D.position;
          var vector3 = new THREE.Vector3(vector.x,  vector2.y, vector.z);
          // console.log("vector",vector2);
        //  console.log("vector",vector3);
          // // console.log("vector",vector2);
          // this.dialogPlaneEl.object3D.lookAt(this.cameraEl.object3D.position);

          this.dialogPlaneEl.object3D.lookAt(vector3);
          let pi = Math.PI;
          let camr = this.cameraEl.object3D.rotation.y;
          camr = camr % (2 * pi);
          camr = (camr > 0) ? camr : 2 * pi + camr;
          let pp =  this.dialogPlaneEl.object3D.position;
          // console.log("camrp",this.dialogPlaneEl.object3D.position);
          // console.log("camr",camr);
          // let mvalue = (camr > -pi/2 && camr < pi / 2) ? 2 * pi  - camr :  pi + camr
          let mvalue = (pp.x > 0 && pp.z > 0) || (pp.x < 0 && pp.z > 0) ? 2 * pi  - camr :  pi + camr
          this.dialogPlaneEl.object3D.rotation.y = mvalue;
          // console.log("rott",this.dialogPlaneEl.object3D.rotation, this.cameraEl.object3D.rotation);


        }
      },
      spawnEntities: function spawnEntities() {
        this.el.appendChild(this.generateOpenIcon());
        this.el.appendChild(this.generateDialogPlane());
        this.el.removeAttribute('position');
      },

      addAnimation: function(item, maxScale = 1.2)
      {
          item.setAttribute('animation__mouseenter', {
              property: 'scale',
              startEvents: 'mouseenter',
              dur: 200,
              to: maxScale + ' ' + maxScale + ' ' + maxScale
            });
          
          item.setAttribute('animation__mouseleave', {
              property: 'scale',
              startEvents: 'mouseleave',
              dur: 200,
              to: '1 1 1'
            });
  
          item.setAttribute('animation__growup', {
              property: 'scale',
              dur: 1000,
              from: '0 0 0',
              to: '1 1 1'
          });
  
      }
    });
    
    /***/ })
    /******/ ]);