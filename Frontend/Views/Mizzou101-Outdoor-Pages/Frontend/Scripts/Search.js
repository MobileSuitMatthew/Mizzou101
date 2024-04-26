console.log("Search.js loaded");


function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const results = foodAndDrinkData.filter(item =>
        item.Name.toLowerCase().includes(searchTerm)
    );

    const listingContainer = document.getElementById('all-food-drink-listing');
    listingContainer.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="DetailPage.html?id=${item._id}">
                <img src="${item.Photo}" alt="${item.Name}">
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


let foodAndDrinkData = []; // Global variable to store fetched data

window.addEventListener('DOMContentLoaded', (event) => {
    fetchFoodAndDrinkData(); // Fetch data when the page loads
});

function fetchFoodAndDrinkData() {
    fetch('https://nodejs.mizzou101.com/api/data/FoodDrink')
        .then(response => response.json())
        .then(data => {
            foodAndDrinkData = data; // Store fetched data
            populateTopSpots(data);
            populateAllFoodDrinks(data);
        })
        .catch(error => {
            console.error('Error fetching Food and Drink data:', error);
        });
}



function updateSearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-result-item';
        resultDiv.innerHTML = `
            <img src="${item.Photo}" alt="${item.Name}" class="search-result-img">
            <div>
                <h4>${item.Name}</h4>
                <p>${item.Description}</p>
                <a href="${item.Link}">Learn more</a>
            </div>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

