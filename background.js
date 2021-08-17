
let color = '#3AA757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background colot set to %cgreen', `color: ${ color }`);
});