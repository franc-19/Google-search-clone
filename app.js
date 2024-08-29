// app.js
import SimpleDB from './db.js';

// Initialize the database
const db = new SimpleDB();

// Handle search form submission
document.getElementById('searchForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchQuery = document.getElementById('searchQuery').value.trim();
    if (searchQuery) {
        db.create({ query: searchQuery, timestamp: new Date().toLocaleString() });
        sessionStorage.setItem('searchQuery', searchQuery);
        window.location.href = 'results.html';
    }
});

// Display search results
if (window.location.pathname.endsWith('results.html')) {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchQuery = sessionStorage.getItem('searchQuery');
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