// app.js
import SimpleDB from './db.js';

// Initialize the database
const db = new SimpleDB();

// Handle search form submission
const searchForm = document.getElementById('searchForm');

function submitFormFn(event) {
    event.preventDefault();

    const searchQueryElement = document.getElementById('searchQuery');

    const searchQuery = searchQueryElement.value.trim();
    if (searchQuery) {
        db.create({ query: searchQuery, timestamp: new Date().toLocaleString() });
        localStorage.setItem('searchQuery', searchQuery);
        window.location.href = 'results.html';
    }
}

searchForm?.addEventListener("submit", submitFormFn);


// Display search results
if (window.location.pathname.endsWith('results.html')) {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery) {
        resultsContainer.innerHTML = `<p>You searched for: <strong>${searchQuery}</strong></p>`;
        // Here you can add logic to display actual search results
    }
}

// Display search history
if (window.location.pathname.endsWith('history.html')) {
    const historyContainer = document.getElementById('historyContainer');
    const history = db.read();

    if (history.length > 0) {
        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.innerHTML = `<p>${index + 1}. ${item.query} - <em>${item.timestamp}</em></p>`;
            historyContainer.appendChild(historyItem);
        });
    } else {
        historyContainer.innerHTML = '<p>No search history found.</p>';
    }
}
