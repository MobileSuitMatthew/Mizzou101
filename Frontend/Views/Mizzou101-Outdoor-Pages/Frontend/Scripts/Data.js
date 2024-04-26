window.addEventListener('DOMContentLoaded', (event) => {
    fetchFoodAndDrinkData();
});

function fetchFoodAndDrinkData() {
    fetch('https://nodejs.mizzou101.com/api/data/FoodDrink')
        .then(response => response.json())
        .then(data => {
            populateTopSpots(data);
            populateAllFoodDrinks(data);
        })
        .catch(error => {
            console.error('Error fetching Food and Drink data:', error);
        });
}

function populateTopSpots(data) {
    const sortedData = [...data].sort((a, b) => a.Rank - b.Rank); // Sort by rank
    const topSpots = sortedData.slice(0, 3); // Get top 3 spots
    const listingContainer = document.getElementById('top-spots-listing');
    listingContainer.innerHTML = '';
    
    topSpots.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="DetailPage.html?id=${item._id}">
                <img src="${item.Photo}" alt="${item.Name}" class="logo">
                <p>${item.Name}</p>
                <p>Rank: ${item.Rank}</p>
            </a>
        `;
        listingContainer.appendChild(itemDiv);
    });
}

function populateAllFoodDrinks(data) {
    const listingContainer = document.getElementById('all-food-drink-listing');
    listingContainer.innerHTML = '';
    
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="DetailPage.html?id=${item._id}">
                <img src="${item.Photo}" alt="${item.Name}" class="logo">
                <p>${item.Name}</p>
            </a>
        `;
        listingContainer.appendChild(itemDiv);
    });
}

