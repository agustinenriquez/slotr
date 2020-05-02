slotList = document.querySelector("#slotList")

chrome.storage.sync.get('slots', function(slots) {
    for (var key in slots.slots) { 
        var li = document.createElement("li");
        li.className = "slotName";
        li.textContent = slots.slots[key];
        slotList.appendChild(li)
        slotList.appendChild(li);
    }
});

