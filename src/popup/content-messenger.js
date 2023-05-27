function createContentMessenger() {

    contentMessenger = {
        filter(filterText) {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, { filterText: filterText });
            })
        },
        resetFilter(){
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, { resetFilter: true });
            })
        },
        switchTab(id){
            chrome.runtime.sendMessage({ mxlAction: "switchTab", tabId: id });
        },
        createTab(url){
            chrome.runtime.sendMessage({ mxlAction: "createTab", url: url });
        }

    };

    return contentMessenger;
}