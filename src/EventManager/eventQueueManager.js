export default class eventQueueManager {
    constructor() {
        this.eventQueue = {};
        return {
            addEventListener: this.registerToEventQueue,
            trigger: this.triggerEvent,
            removeEventListner: this.deregisterFromEventQueue
        };
    }

    registerToEventQueue(eventName, callback) {
        if (typeof callback !== "function") {
            throw new Error("invalid callback: function required");
        }
        let callbackArr = this.eventQueue[eventName];
        let index = 0;
        if (typeof callbackArr === "array") {
            callbackArr.push(callback);
            index = callbackArr.length;
        } else {
            this.eventQueue[eventName] = [callback];
            index = 1;
        }
        return index;
    }

    deregisterFromEventQueue(eventName, index) {
        let callbackArr = this.eventQueue[eventName];
        if (callbackArr && index) {
            callbackArr.splice(index - 1, 1);
        } else if (callbackArr) {
            this.eventQueue[eventName] = [];
        } else {
            return false;
        }
        return true;
    }

    triggerEvent(eventName) {
        let self = this;
        let callbackArr = this.eventQueue[eventName];
        if (callbackArr) {
            callbackArr.map(function (callback) {
                if (typeof callback === "function") {
                    callback.call(self);
                }
            });
            return true;
        }
        return false;
    }
};