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
    eventNames = [
        "swipeleft", // 0
        "swiperight", // 1
        "swipeup", // 2
        "swipedown", // 3
        "tap", // 4
        "zoomin", // 5
        "zoomout", // 6
    ];
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
            if (e.changedTouches) {
                if (e.changedTouches.length > 1) {
                    this._start = {
                        0: {
                            x: e.changedTouches[0].screenX,
                            y: e.changedTouches[0].screenY,
                        },
                        1: {
                            x: e.changedTouches[1].screenX,
                            y: e.changedTouches[1].screenY,
                        },
                    };
                } else {
                    this._start.x = e.changedTouches[0].screenX;
                    this._start.y = e.changedTouches[0].screenY;
                }
            } else {
                this._start.x = e.screenX;
                this._start.y = e.screenY;
            }
        };
        this._endEvent = (e) => {
            if (e.changedTouches?.length > 1) {
                this._multitouchHandler(e);
            } else
                this._handler(
                    e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
                    e.changedTouches ? e.changedTouches[0].screenY : e.screenY,
                    e
                );
        };

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
    _normalize(val) {
        const a = Math.abs(val) - this.offset;
        return a <= 0 ? 0 : a;
    }

    _handler(x, y, e) {
        const iX = x - this._start.x,
            iY = y - this._start.y;

        const normX = this._normalize(iX),
            normY = this._normalize(iY);

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

    _multitouchHandler(e) {
        const { changedTouches } = e,
            distanceNew = this._getDistance(
                changedTouches[0],
                changedTouches[1]
            ),
            distanceOld = this._getDistance(this._start[0], this._start[1]);
        if (distanceOld > distanceNew) {
            this._triggerEvent(5, e);
        } else {
            this._triggerEvent(6, e);
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
    _getDistance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
}
