let slotList = document.getElementById('slotList');

chrome.storage.sync.get('slots', function(slots) {
    console.log(slots)
    console.log("slots data")
    for (key in slots["slots"]) { 
        var li = document.createElement("li");
        li.className = "slotName";
        li.textContent = slots["slots"][key];
        slotList.appendChild(li)
        slotList.appendChild(li);
    }
});