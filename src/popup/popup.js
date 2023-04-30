document.getElementById('applyFilter').addEventListener('click', () => {
  const filterText = document.getElementById('filterInput').value;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { filterText: filterText });
  });
});

document.getElementById('resetFilter').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { resetFilter: true });
  });
});
/*
document.getElementById('navForums').addEventListener('click', () => {
  //func in forums.js? make it modular?
});
*/