function createKnownURLsManager(knownURLs) {
    const nameToUrls = {};
    const urlToNames = {};

    knownURLsManager = {
        async loadKnownURLs() {
            const response = await fetch(knownURLs);
            const data = await response.json();
            
            data.forEach((entry) => {
                const { names, url } = entry;

                // Map name(s) to url(s)
                names.forEach((name) => {
                    if (!nameToUrls[name]) {
                        nameToUrls[name] = [];
                    }
                    if (!nameToUrls[name].includes(url)) {
                        nameToUrls[name].push(url);
                    }
                });
            
                // Map url to name(s)
                if (!urlToNames[url]) {
                    urlToNames[url] = [];
                }
                names.forEach((name) => {
                    if (!urlToNames[url].includes(name)) {
                        urlToNames[url].push(name);
                    }
                });
            });
        },
        getWebpageNames(url){
            return urlToNames[url];
        },
        getURLs(webpageName){
            return nameToUrls[webpageName];
        }
    }; 

    return knownURLsManager;
}
