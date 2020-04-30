var port = chrome.runtime.connect({name:"slotr"});

port.onMessage.addListener(function(message,sender){
  if (message.slots) {
    console.log(message.slots);
  }
  if (message.slotUrl) {
    window.open(message.slotUrl, '_blank');
  }
});

$(document).ready(function() {
  var keyMap = { 67: false, 16: false, 49: false, 50: false, 51: false,
    52: false, 53: false, 86: false, 68: false, 65: false, 83: false,
  };

  $(document).keydown(function(e) {
    if (e.keyCode in keyMap) {
      keyMap[e.keyCode] = true;
      if (keyMap[16]) {
        if (keyMap[68]) {
          console.log('empty slot');
          port.postMessage({emptySlot: true});
        }
        if (keyMap[65]) {
          console.log('clear slots');
          port.postMessage({clearAll: true});
        }
        if (keyMap[83]) {
          console.log('show slots');
          port.postMessage({showSlots: true});
        }
        if (keyMap[49] || keyMap[50] || keyMap[51] || keyMap[52] || keyMap[53]) {
          if (!keyMap[67] && !keyMap[86]) 
          {
            console.log("Document catch Shift+whatever");
            port.postMessage({url: document.URL, position: e.keyCode});
          }
          if (keyMap[67])
          {
            console.log('Clear Slot');
            port.postMessage({clearSlot: e.keyCode});
          }
          if (keyMap[86]) 
          {
            console.log('Open slot');
            port.postMessage({openSlot: e.keyCode});
          } 
        }

      }
    }
  }).keyup(function(e) {
      if (e.keyCode in keyMap) keyMap[e.keyCode] = false;
  });
});