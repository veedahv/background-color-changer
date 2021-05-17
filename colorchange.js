const picker = document.getElementById("color");
const button = document.getElementById("changeColor");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.storage.sync.set({ color: picker.value });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

function setPageBackgroundColor() {
    chrome.storage.sync.get( "color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}