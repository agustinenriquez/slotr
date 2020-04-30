var slots = { 49: null, 50: null, 51: null, 52: null,53: null};
var lastModifiedSlot = null;

chrome.runtime.onConnect.addListener(function(port){
    console.assert(port.name == "slotr");
    port.onMessage.addListener(function(message) {
        if (message.url && message.position in slots) {
            slots[message.position] = message.url;
            port.postMessage({slots: slots});
            lastModifiedSlot = message.position;
        }
        if (message.emptySlot) {
            slots[lastModifiedSlot] = null;
            port.postMessage({slots: slots});
        }
        if (message.clearAll) {
            slots = {49: null, 50: null, 51: null, 52: null, 53: null};
            port.postMessage({slots: slots});
        }
        if (message.clearSlot) {
            slots[message.clearSlot] = null;
            port.postMessage({slots: slots});
        }
        if (message.showSlots) {
            port.postMessage({slots: slots});
        }
        if (message.openSlot) {
            port.postMessage({slotUrl: slots[message.openSlot]});
        }
    });
  });