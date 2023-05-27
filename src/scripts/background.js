function mxlFocusTab(tabId) {
    return new Promise((resolve, reject) => {
        chrome.tabs.get(tabId, function (tab) {
            if (chrome.runtime.lastError) {
                reject('Failed to get tab: ' + chrome.runtime.lastError.message);
                return;
            }
            chrome.windows.update(tab.windowId, { focused: true }, function () {
                if (chrome.runtime.lastError) {
                    reject('Failed to focus window: ' + chrome.runtime.lastError.message);
                    return;
                }
                chrome.tabs.update(tabId, { active: true }, function () {
                    if (chrome.runtime.lastError) {
                        reject('Failed to activate tab: ' + chrome.runtime.lastError.message);
                        return;
                    }
                    resolve(tabId);
                });
            });
        });
    });
}

function mxlCreateTab(url) {
    return new Promise((resolve, reject) => {
        chrome.tabs.create({ url: url }, function(tab) {
            if (chrome.runtime.lastError) {
                reject('Failed to create tab: ' + chrome.runtime.lastError.message);
                return;
            }
            resolve(tab.id);
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.mxlAction === "scanTabs") {
        // Your scanTabs code here
    }
    else if (request.mxlAction === "switchTab") {
        mxlFocusTab(request.tabId);
    }
    else if (request.mxlAction === "createTab") {
        mxlCreateTab(request.url);
    }
    // Add else if for other actions as needed
});
