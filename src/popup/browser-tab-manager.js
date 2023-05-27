function createBrowserTabManager(knownURLsManager, contentMessenger) {

    const urlToTabIds = {};
    const tabIdToUrl = {};

    browserTabManager = {
        async scanTabs() {
            return new Promise((resolve) => {
                chrome.tabs.query(
                    { url: [ 'http://*.median-xl.com/*', 'https://*.median-xl.com/*' ] }, 
                    function(tabs) {
                        tabs.forEach(tab => {
                            if (!urlToTabIds[tab.url]) {
                                urlToTabIds[tab.url] = [];
                            }
                            urlToTabIds[tab.url].push(tab.id);
                            tabIdToUrl[tab.id] = tab.url;
                        });
                        resolve();
                    }
                );
            });
        },
        switchTab(url){ 
            if (!urlToTabIds[url] || urlToTabIds[url].length === 0) {
                return this.createTab(url); // Create new tab if no matching tab found
            }
        
            let tabId = urlToTabIds[url][0];

            console.log("sending id to content messenger.")
            contentMessenger.switchTab(tabId);

        /*
            return focusTab(tabId).then(tabId => {
                console.log(url + ' tab focused successfully. TabId: ' + tabId);
            }).catch(error => {
                console.log('Error focusing tab: ' + error);
                throw error; 
            });
            */
        },
        createTab(url) {
            contentMessenger.createTab(url);
        },
        tabExists() {

        },
        getTabId() {

        },
        logCurrentTabs(){ 
            console.log(urlToTabIds);
        }

    };

    function focusTab(tabId){
        return new Promise((resolve, reject) => {
            chrome.tabs.get(tabId, function(tab) {
                if (chrome.runtime.lastError) {
                    reject('Failed to get tab: ' + chrome.runtime.lastError.message);
                    return;
                }
                chrome.windows.update(tab.windowId, {focused: true}, function() {
                    if (chrome.runtime.lastError) {
                        reject('Failed to focus window: ' + chrome.runtime.lastError.message);
                        return;
                    }
                    chrome.tabs.update(tabId, { active: true }, function() {
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

    return browserTabManager;
}
