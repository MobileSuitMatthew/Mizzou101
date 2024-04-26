window.addEventListener('DOMContentLoaded', (event) => {
    fetchOutdoorData();
});

function fetchOutdoorData() {
    fetch('https://nodejs.mizzou101.com/api/data/Outdoors')
        .then(response => response.json())
        .then(data => {
            populateAllOutdoorActivities(data);
        })
        .catch(error => {
            console.error('Error fetching Outdoor Activities data:', error);
        });
}



function populateAllOutdoorActivities(data) {
    const listingContainer = document.getElementById('all-outdoor-listing');
    listingContainer.innerHTML = '';
    
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="OutdoorDetail.html?id=${item._id}">
                
                <p>${item.Name}</p>
            </a>
        `;
        listingContainer.appendChild(itemDiv);
    });
}
