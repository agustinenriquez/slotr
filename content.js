var port = chrome.runtime.connect({name:"slotr"});

port.onMessage.addListener(function(message){
  if (message.openAll) {
    Object.values(message.openSlots).forEach(function(url) {
      if (url)  window.open(url, '_blank');
    });
  }
  if (message.showSlots) {
    console.log("Current slots");
    console.log(message.slots);
  }
  if (message.slotUrl && !message.openAll) {
    window.open(message.slotUrl, '_blank');
  }
});

$(document).ready(function() {
  var keyMap = { 67: false, 16: false, 49: false, 50: false, 51: false,
    52: false, 53: false, 86: false, 68: false, 65: false, 83: false, 88: false,
  };

  $(document).keydown(function(e) {
    if (e.keyCode in keyMap) {
      keyMap[e.keyCode] = true;
      if (keyMap[16]) {
        if (keyMap[68]) {
          // Shift + D
          console.log('empty slot');
          port.postMessage({emptySlot: true});
        }
        if (keyMap[65]) {
          // Shift + A
          console.log('clear slots');
          port.postMessage({clearAll: true});
        }
        if (keyMap[83]) {
          // Shift + S
          console.log('show slots');
          port.postMessage({showSlots: true});
        }
        if (keyMap[88]) {
          // Shift + X
          console.log("Open all slots");
          port.postMessage({openAll: true});
          keyMap[88] = false;
        }
        if (keyMap[49] || keyMap[50] || keyMap[51] || keyMap[52] || keyMap[53]) {
          if (!keyMap[67] && !keyMap[86]) 
          {
            // Shift + Num
            console.log("Added URL to slot " + e.code);
            port.postMessage({url: document.URL, position: e.keyCode});
          }
          if (keyMap[67])
          {
            // Shift + C + Num
            console.log('Clear Slot');
            port.postMessage({clearSlot: e.keyCode});
          }
          if (keyMap[86]) 
          {
            // Shift + V + Num
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