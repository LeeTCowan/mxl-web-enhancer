//window.mxlWeb = window.mxlWeb || {};

contentMessenger = createContentMessenger();

(async () => {
  try {
    await loadScript("known-urls-manager.js");
    await loadScript("popup-tab-manager.js");
    await loadScript("browser-tab-manager.js");

    const knownURLsManager = createKnownURLsManager('known-urls.json');
    const popupTabManager = createPopupTabManager("popupTabsContainer", "forums");
    const browserTabManager = createBrowserTabManager(knownURLsManager, contentMessenger);
    
    await knownURLsManager.loadKnownURLs();
    await browserTabManager.scanTabs();
    await popupTabManager.loadHomeTab();
    
    popupTabManager.showHomeTab();
    
    await popupTabManager.loadAllTabs();

    document.getElementById("navForums").addEventListener("click", () => popupTabManager.showTab("forums"));
    document.getElementById("navItems").addEventListener("click", () => popupTabManager.showTab("items"));
    document.getElementById("navDocs").addEventListener("click", () => popupTabManager.showTab("docs"));
    document.getElementById("navChangelogs").addEventListener("click", () => popupTabManager.showTab("changelogs"));

    //logTabs();
    //browserTabManager.switchTab("https://docs.median-xl.com/doc/items/sacreduniques");

  } catch (error) {
    console.error("Error...", error);
  }
})();