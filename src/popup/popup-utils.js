function loadCSS (url) {
    /* TODO : dont load if already present */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}
async function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve(script);
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
    });
}
  
async function loadHTML(file) {
    try {
        const response = await fetch(file);
        const html = await response.text();

        const container = document.createElement('div');
        container.innerHTML = html;

        return container;

    } catch (error) {
        console.warn("Error loading HTML file:", error);
    }
}

async function loadJson(file) {
    try {
        let response = await fetch(file);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function logTabs() {
    chrome.tabs.query({ 
        url: [ 'http://*.median-xl.com/*', 'https://*.median-xl.com/*' ]},
        function (tabs) {
        console.log(tabs);
        /*
        for (const tab of tabs) {
          const listItem = document.createElement('li');
          listItem.textContent = `${tab.title} (ID: ${tab.id})`;
          tabsList.appendChild(listItem);
        }
        */
    });
}