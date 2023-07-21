var SSC = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * Lib simple add additional tap events in HTML element
   * additional events:
   * - swipeLeft
   * - swipeRight
   * - swipeUp
   * - swipeDown
   * - tap
   */
  var SmartSwipeController = /*#__PURE__*/function () {
    /**
     * Apply additional tap events in HTML element
     * @param {HTMLElement} element - any HTML element
     * @param {number} offset - the zone of non-triggering side events in pixels (except for the tap event)
     */
    function SmartSwipeController(element) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      _classCallCheck(this, SmartSwipeController);
      _defineProperty(this, "_start", {
        x: 0,
        y: 0
      });
      /**
       * Events Array. Can be changed
       */
      _defineProperty(this, "eventNames", ["swipeleft", "swiperight", "swipeup", "swipedown", "tap"]);
      this.element = element;
      this.offset = offset;
      this.addEvents();
    }
    /**
     * Manualy init events
     */
    _createClass(SmartSwipeController, [{
      key: "addEvents",
      value: function addEvents() {
        var _this = this;
        this._startEvent = function (e) {
          _this._start.x = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
          _this._start.y = e.changedTouches ? e.changedTouches[0].screenY : e.screenY;
        };
        this._endEvent = function (e) {
          return _this._handler(e.changedTouches ? e.changedTouches[0].screenX : e.screenX, e.changedTouches ? e.changedTouches[0].screenY : e.screenY, e);
        };
        this._events();
      }
      /**
       * remove additional events
       */
    }, {
      key: "removeEvents",
      value: function removeEvents() {
        this._events("remove");
      }
    }, {
      key: "_events",
      value: function _events() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "add";
        this.element[a + "EventListener"]("touchstart", this._startEvent);
        this.element[a + "EventListener"]("mousedown", this._startEvent);
        this.element[a + "EventListener"]("touchend", this._endEvent);
        this.element[a + "EventListener"]("mouseup", this._endEvent);
      }
    }, {
      key: "_handler",
      value: function _handler(x, y, e) {
        var iX = x - this._start.x,
          iY = y - this._start.y;
        var normX = Math.abs(iX) - this.offset <= 0 ? 0 : Math.abs(iX) - this.offset,
          normY = Math.abs(iY) - this.offset <= 0 ? 0 : Math.abs(iY) - this.offset;
        if (normX === 0 && normY === 0) {
          this._triggerEvent(4, e);
        } else if (normX > normY) {
          if (iX < 0) {
            this._triggerEvent(0, e);
          } else if (iX > 0) {
            this._triggerEvent(1, e);
          }
        } else {
          if (iY < 0) {
            this._triggerEvent(2, e);
          } else if (iY > 0) {
            this._triggerEvent(3, e);
          }
        }
      }
    }, {
      key: "_getEventName",
      value: function _getEventName(eventId) {
        return this.eventNames[eventId];
      }
    }, {
      key: "_triggerEvent",
      value: function _triggerEvent(eventId, event) {
        this.element.dispatchEvent(new Event(this._getEventName(eventId), event));
      }
    }]);
    return SmartSwipeController;
  }();

  exports.SmartSwipeController = SmartSwipeController;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
