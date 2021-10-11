
let currentLocation = 'auto:ip';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ currentLocation });
});