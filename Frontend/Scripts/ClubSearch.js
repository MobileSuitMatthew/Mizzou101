console.log("Search.js loaded");


function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const results = ClubSportData.filter(item =>
        item.Name.toLowerCase().includes(searchTerm)
    );

    const listingContainer = document.getElementById('all-clubs-listing');
    listingContainer.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="ClubDetailPage.html?id=${item._id}">
                <p>${item.Name}</p>
            </a>
        `;
        listingContainer.appendChild(itemDiv);
    });
}

const debouncedSearch = debounce(performSearch, 250); // ms delay

// Update event listener to use the debounced function
document.getElementById('searchInput').oninput = debouncedSearch;

function debounce(func, delay) {
    let timer; // Timer to manage the delay
    return function (...args) { // Return a function that can be debounced
        clearTimeout(timer); // Clear the existing timer
        timer = setTimeout(() => { // Set a new timer
            func.apply(this, args); // Call the original function after the delay
        }, delay); // Set the delay in milliseconds
    };
}


let ClubSportData = []; // Global variable to store fetched data

window.addEventListener('DOMContentLoaded', (event) => {
    fetchClubSportData(); // Fetch data when the page loads
});

function fetchClubSportData() {
    fetch('https://nodejs.mizzou101.com/api/data/ClubSport')
        .then(response => response.json())
        .then(data => {
            ClubSportData = data; // Store fetched data
            populateAllClubs(data);
        })
        .catch(error => {
            console.error('Error fetching Club data:', error);
        });
}



function updateSearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-result-item';
        resultDiv.innerHTML = `
            <div>
                <h4>${item.Name}</h4>
                <p>${item.Tag}</p>
                <a href="${item.Link}">Learn more</a>
            </div>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

