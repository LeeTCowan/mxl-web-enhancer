(() => {
    applyEventListeners(contentMessenger);
})();

function toggleInput(element) {
    const inputWrapper = element.querySelector('.input-wrapper');
    const input = inputWrapper.querySelector('input');
    const arrowButton = inputWrapper.querySelector('.arrow-button');

    input.classList.toggle('hidden');
    arrowButton.classList.toggle('hidden');
}

function applyEventListeners(contentMessenger){

    document.getElementById('applyFilter').addEventListener('click', () => {
        const filterText = document.getElementById('filterInput').value;
        contentMessenger.filter(filterText);
    });
    
    document.getElementById('resetFilter').addEventListener('click', () => {
        contentMessenger.resetFilter();
    });
}
/*
function applyEventListeners(contentMessenger){
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
}
*/