HTMLElement.prototype.doEvent = function (eventName) {
    this.dispatchEvent(new Event(eventName))
}