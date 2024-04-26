document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    renderAllItems(); // Call the function to render all items initially

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchData = fetchFromMongoDB(searchTerm);
        displaySearchResults(searchData);
    });

    function fetchFromMongoDB(searchTerm) {
        // Dummy data with the same image for all items
        const imageUrl = "https://logowik.com/content/uploads/images/mizzou-missouri-tigers5338.jpg";
        const allItems = [
            { name: "Campus Bar and Grill/B12", image: imageUrl, link: "https://campusbarandgrill.com/" },
            { name: "ITAP – International Tap House", image: imageUrl, link: "http://example.com" },
            { name: "Harpos", image: imageUrl, link: "http://example.com" },
            { name: "Willies/Fieldhouse", image: imageUrl, link: "http://example.com" },
            { name: "MyHouse", image: imageUrl, link: "http://example.com" },
            { name: "Shiloh Bar and Grill", image: imageUrl, link: "http://example.com" },
            { name: "Silverball", image: imageUrl, link: "http://example.com" },
            { name: "Shot Bar", image: imageUrl, link: "http://example.com" },
            { name: "The Understudy", image: imageUrl, link: "http://example.com" },
            { name: "On the Rocks", image: imageUrl, link: "http://example.com" },
            { name: "McNally’s", image: imageUrl, link: "http://example.com" },
            { name: "Stadium Grill", image: imageUrl, link: "http://example.com" },
            { name: "Flatbranch Pub and Brewery", image: imageUrl, link: "http://example.com" },
            { name: "Tropical Liqueurs", image: imageUrl, link: "http://example.com" },
            { name: "EastSide", image: imageUrl, link: "http://example.com" },
            { name: "Klik’s LLC", image: imageUrl, link: "http://example.com" },
            { name: "Heidelberg", image: imageUrl, link: "http://example.com" },
            { name: "Walk on’s", image: imageUrl, link: "http://example.com" },
            { name: "The Penguin Piano Bar (2024 return) Need more Research", image: imageUrl, link: "http://example.com" },
            { name: "9th Street Public House", image: imageUrl, link: "http://example.com" },
            { name: "Room 38", image: imageUrl, link: "http://example.com" },
        ]; 

        // Filter the items based on the search term
        return allItems.filter(item => item.name.toLowerCase().includes(searchTerm));
    }

    function displaySearchResults(searchData) {
        searchResults.innerHTML = '';
        searchData.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const a = document.createElement('a');
            a.href = item.link; // Set the link destination for each item

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const p = document.createElement('p');
            p.textContent = item.name;

            a.appendChild(img);
            a.appendChild(p);
            itemDiv.appendChild(a);
            searchResults.appendChild(itemDiv);
        });
    }

    function renderAllItems() {
        // Fetch all items initially
        const allItems = fetchFromMongoDB('');
        // Display all items
        displaySearchResults(allItems);
    }
});
