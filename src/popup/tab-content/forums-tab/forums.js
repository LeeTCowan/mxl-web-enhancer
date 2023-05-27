/*
document.getElementById("forumLink1").addEventListener("click", () => browserTabManager.switchTab('https://forum.median-xl.com/viewtopic.php?t=76278'));
document.getElementById("forumLink2").addEventListener("click", () => browserTabManager.switchTab('https://forum.median-xl.com/viewtopic.php?f=40&t=78735'));
document.getElementById("forumLink3").addEventListener("click", () => browserTabManager.switchTab('https://forum.median-xl.com/viewtopic.php?f=40&t=78976'));
document.getElementById("forumLink4").addEventListener("click", () => browserTabManager.switchTab('https://forum.median-xl.com/viewtopic.php?f=40&t=58185'));
document.getElementById("forumLink5").addEventListener("click", () => browserTabManager.switchTab('https://forum.median-xl.com/viewtopic.php?f=40&t=79260'));
document.getElementById("forumLink6").addEventListener("click", () => browserTabManager.switchTab('https://forum.median-xl.com/viewtopic.php?f=40&t=78578'));
*/

populateLinks("forums-links-list", url => { browserTabManager.switchTab(url); });

async function fetchLinkData(file) {
    try {
        let response = await fetch(file);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function populateLinks(listElementId, onClickFunction) {
    let linkData = await loadJson('tab-content/forums-tab/forums.json');
  
    let listElement = document.getElementById(listElementId);
    
    linkData.forEach(link => {
      let listItem = document.createElement('li');
      listItem.textContent = link.name;
  
      // Check if there are sublinks
      if (link.sublinks) {
        let subList = document.createElement('ul');
        link.sublinks.forEach(sublink => {
          let subListItem = document.createElement('li');
          subListItem.textContent = sublink.name;
          subListItem.addEventListener('click', function(e) {
            e.stopPropagation();
            onClickFunction(sublink.url);
          });
          subList.appendChild(subListItem);
        });
        listItem.appendChild(subList);
      } else {
        listItem.addEventListener('click', function(e) {
          if (e.target === listItem) { // check if the event is directly on the list item
            onClickFunction(link.url);
          }
        });
      }
      
      listElement.appendChild(listItem);
    });
  }