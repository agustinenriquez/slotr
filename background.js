var slots = { 49: null, 50: null, 51: null, 52: null,53: null};
var lastModifiedSlot = null;
var flag = true;

function createAlert(msg) {
    chrome.notifications.create("addUrl", {   
        type: "basic", 
        title: "Slotr", 
        message: msg,
        iconUrl: "plus-flat.png"
        }, function() {
        console.log(chrome.runtime.lastError);
    });
}

chrome.runtime.onConnect.addListener(function(port){
    console.assert(port.name == "slotr");
    if (flag) {
        chrome.storage.sync.set({"slots": slots});
        flag = false;
    }
    port.onMessage.addListener(function(message) {
        if (message.url && message.position in slots) {
            slots[message.position] = message.url;
            port.postMessage({slots: slots});
            lastModifiedSlot = message.position;
            chrome.storage.sync.set({"slots": slots});
            createAlert("saved url");
        }
        if (message.openAll) {
            port.postMessage({openAll: message.openAll, openSlots: slots});
        }
        if (message.emptySlot) {
            slots[lastModifiedSlot] = null;
            chrome.storage.sync.set({"slots": slots});
            port.postMessage({slots: slots});
            createAlert("last empty slot");
        }
        if (message.clearAll) {
            slots = {49: null, 50: null, 51: null, 52: null, 53: null};
            chrome.storage.sync.set({"slots": slots});
            port.postMessage({slots: slots});
            createAlert("slots are now empty");
        }
        if (message.clearSlot) {
            slots[message.clearSlot] = null;
            chrome.storage.sync.set({"slots": slots});
            port.postMessage({slots: slots});
            createAlert("selected slot is now empty");
        }
        if (message.showSlots) {
            chrome.storage.sync.set({"slots": slots});
            port.postMessage({showSlots: message.showSlots, slots: slots});
        }
        if (message.openSlot) {
            chrome.storage.sync.set({"slots": slots});
            port.postMessage({slotUrl: slots[message.openSlot]});
        }
    });
  });