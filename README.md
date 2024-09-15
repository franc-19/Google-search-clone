# Google-search-clone
# **Building a Simple Google Search Clone**
.
Intro

Here's a tutorial on how to build a simple Google Search clone using JavaScript. We'll use the `SimpleDB` class from the previous tutorial to store search results and display them on a search results page. Additionally, we'll create a history page to display past searches. The footer will include links to `History`, `T&C`, and `About`, and will be centered on every page.

---

### **Overview**

In this tutorial, we'll create a simple Google Search clone using JavaScript. We'll build the following features:

1. A search page where users can enter search queries.
2. A search results page displaying the search results stored in our in-memory database (`SimpleDB`).
3. A history page that shows all past search queries.
4. A footer with links to `History`, `T&C`, and `About`, centered on every page.

### **Step 1: Setting Up the Project Structure**

Start by creating the basic structure of your project with the following files:

```plaintext
google-clone/
│
├── index.html
├── results.html
├── history.html
├── db.js
├── app.js
└── style.css
```

### **Step 2: Creating the Database Class**

Use the `SimpleDB` class from the previous tutorial to manage the search history.

```javascript
// db.js

class SimpleDB {
    constructor() {
        this.data = [];
    }

    create(record) {
        this.data.push(record);
    }

    read() {
        return this.data;
    }

    update(index, newRecord) {
        if (index >= 0 && index < this.data.length) {
            this.data[index] = newRecord;
        } else {
            console.error('Record not found.');
        }
    }

    delete(index) {
        if (index >= 0 && index < this.data.length) {
            this.data.splice(index, 1);
        } else {
            console.error('Record not found.');
        }
    }

    find(index) {
        if (index >= 0 && index < this.data.length) {
            return this.data[index];
        } else {
            console.error('Record not found.');
            return null;
        }
    }
}

// Export the class for use in other modules
export default SimpleDB;
```

### **Step 3: Building the HTML Pages**

Create three HTML files: `index.html` (for the search page), `results.html` (for displaying search results), and `history.html` (for showing the search history).

#### **index.html** - Search Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Search Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Google Clone</h1>
        <form id="searchForm">
            <input type="text" id="searchQuery" placeholder="Search Google..." required>
            <button type="submit">Search</button>
        </form>
    </div>

    <footer>
        <a href="history.html">History</a>
        <a href="#">T&C</a>
        <a href="#">About</a>
    </footer>

    <script type="module" src="app.js"></script>
</body>
</html>
```

#### **results.html** - Search Results Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Results</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Search Results</h1>
        <div id="resultsContainer"></div>
    </div>

    <footer>
        <a href="history.html">History</a>
        <a href="#">T&C</a>
        <a href="#">About</a>
    </footer>

    <script type="module" src="app.js"></script>
</body>
</html>
```

#### **history.html** - Search History Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search History</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Search History</h1>
        <div id="historyContainer"></div>
    </div>

    <footer>
        <a href="history.html">History</a>
        <a href="#">T&C</a>
        <a href="#">About</a>
    </footer>

    <script type="module" src="app.js"></script>
</body>
</html>
```

### **Step 4: Adding the JavaScript Logic**

In the `app.js` file, write the logic to handle search queries, display search results, and show the search history.

```javascript
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
```

### **Step 5: Styling the Pages**

In the `style.css` file, add styles to ensure that the layout is simple, clean, and centered.

```css
/* Reset default margin and padding */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body and container */
body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    width: 90%;
    max-width: 600px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    margin-bottom: 20px;
    font-size: 24px;
}

form {
    margin-bottom: 20px;
}

input[type="text"] {
    width: 80%;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #357ae8;
}

/* Footer styles */
footer {
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
}

footer a {
    margin: 0 15px;
    text-decoration: none;
    color: #4285f4;
}

footer a:hover {
    text-decoration: underline;
}
```

### **Step 6: Running the Project**

1. Open `index.html` in your browser.
2. Type a search query into the input box and hit "Search."
3. The results page should display the search query.
4. Click on "History" in the footer to view past searches.
5. Test the layout and functionality of the T&C and About links (you can expand these with content later).

---

By following these steps, you've built a simple Google Search clone that stores search results using an in-memory database and displays search history. The project demonstrates basic CRUD operations, modular JavaScript, and a clean, responsive UI design.
