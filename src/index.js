/**
 * Lib simple add additional tap events in HTML element
 * additional events:
 * - swipeLeft
 * - swipeRight
 * - swipeUp
 * - swipeDown
 * - tap
 */
export class SmartSwipeController {
    _start = { x: 0, y: 0 };
    /**
     * Events Array. Can be changed
     */
    eventNames = ["swipeleft", "swiperight", "swipeup", "swipedown", "tap"];
    /**
     * Apply additional tap events in HTML element
     * @param {HTMLElement} element - any HTML element
     * @param {number} offset - the zone of non-triggering side events in pixels (except for the tap event)
     */
    constructor(element, offset = 5) {
        this.element = element;
        this.offset = offset;
        this.addEvents();
    }
    /**
     * Manualy init events 
     */
    addEvents() {
        this._startEvent = (e) => {
            this._start.x = e.changedTouches
                ? e.changedTouches[0].screenX
                : e.screenX;
            this._start.y = e.changedTouches
                ? e.changedTouches[0].screenY
                : e.screenY;
        };
        this._endEvent = (e) =>
            this._handler(
                e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
                e.changedTouches ? e.changedTouches[0].screenY : e.screenY,
                e
            );

        this._events();
    }
    /**
     * remove additional events
     */
    removeEvents() {
        this._events("remove");
    }

    _events(a = "add") {
        this.element[a + "EventListener"]("touchstart", this._startEvent);
        this.element[a + "EventListener"]("mousedown", this._startEvent);

        this.element[a + "EventListener"]("touchend", this._endEvent);
        this.element[a + "EventListener"]("mouseup", this._endEvent);
    }

    _handler(x, y, e) {
        const iX = x - this._start.x,
            iY = y - this._start.y;

        const normX =
                Math.abs(iX) - this.offset <= 0
                    ? 0
                    : Math.abs(iX) - this.offset,
            normY =
                Math.abs(iY) - this.offset <= 0
                    ? 0
                    : Math.abs(iY) - this.offset;

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
    _getEventName(eventId) {
        return this.eventNames[eventId];
    }
    _triggerEvent(eventId, event) {
        this.element.dispatchEvent(
            new Event(this._getEventName(eventId), event)
        );
    }
}
module.exports = SmartSwipeController