function createPopupTabManager(tabsContainerID, homeTabName) {

    const tabsContainer = document.getElementById(tabsContainerID);
    const homeTab = homeTabName;
    const tabs = {
        "forums" : {
            "container" : {},
            "html" : "tab-content/forums-tab/forums.html",
            "css" : "tab-content/forums-tab/forums.css",
            "js" : "tab-content/forums-tab/forums.js"
        },
        "items" : {
            "container" : {},
            "html" : "tab-content/items-tab/items.html",
            "css" : "tab-content/items-tab/items.css",
            "js" : "tab-content/items-tab/items.js"
        },
        "docs" : {
            "container" : {},
            "html" : "tab-content/docs-tab/docs.html",
            "css" : "tab-content/docs-tab/docs.css",
            "js" : "tab-content/docs-tab/docs.js"
        },
        "changelogs" : {
            "container" : {},
            "html" : "tab-content/changelogs-tab/changelogs.html",
            "css" : "tab-content/changelogs-tab/changelogs.css",
            "js" : "tab-content/changelogs-tab/changelogs.js"
        }
    };

    const popupTabManager = {

        async loadHomeTab() {
            await this.loadTab(homeTab);
        },
        async loadTab(tabName) {
            if (tabIsLoaded(tabName)) {
                return;
            };
            container = tabs[tabName]["container"];
            let css = tabs[tabName].css;
            let html = tabs[tabName].html;
            let js = tabs[tabName].js;

            loadCSS(css);
            container = await loadHTML(html); //TODO: deal with errors
            container.classList.add('tab-container');
            tabsContainer.appendChild(container);
            tabs[tabName]["container"] = container;
            await loadScript(js);
        },
        async loadAllTabs() {
            for (let tab in tabs) {
                await this.loadTab(tab);
            }
        },
        showHomeTab() {
            this.showTab(homeTab);
        },
        showTab(tabName) {
            Object.entries(tabs).forEach(([key, tab]) => {
                if (!(tabs[key]["container"] instanceof HTMLElement)){
                    return;
                }
                if (key == tabName) {
                    tabs[key]["container"].classList.add("active");
                } else {
                    tabs[key]["container"].classList.remove("active");
                }
            });
        }
        

    };

    function tabIsLoaded(tabName){
        return tabs[tabName]["container"] instanceof HTMLElement;
    }

    return popupTabManager;
}