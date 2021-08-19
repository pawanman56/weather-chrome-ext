
let currentLocation = 'Kathmandu';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ currentLocation });
});