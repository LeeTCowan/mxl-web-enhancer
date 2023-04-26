let originalTables = new Map();

function filterTables(filterText) {
  const tables = document.querySelectorAll('table');
  tables.forEach((table, index) => {
    const tableClone = table.cloneNode(true);
    const cells = Array.from(tableClone.querySelectorAll('td, th'));
    const matchingCells = cells.filter(cell => cell.textContent.includes(filterText));

    if (matchingCells.length === 0) {
      if (!originalTables.has(table)) {
        originalTables.set(table, tableClone);
      }
      table.style.display = 'none';
    }
  });
}

function resetTables() {
  originalTables.forEach((originalTable, table) => {
    table.style.display = '';
  });
  originalTables.clear();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.filterText) {
    filterTables(request.filterText);
  } else if (request.resetFilter) {
    resetTables();
  }
});
