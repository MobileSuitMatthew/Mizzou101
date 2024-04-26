document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');
    fetch(`https://nodejs.mizzou101.com/api/data/FoodDrink/${placeId}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('placeName').textContent = data.Name;
        document.getElementById('placeImage').src = data.Photo || 'default-placeholder.png';
        document.getElementById('placeImage').alt = data.Name;
        document.getElementById('placeDescription').textContent = data.Description;
        document.getElementById('placeLink').href = data.Link;
        document.getElementById('placeLink').textContent = 'Visit Website';
        document.getElementById('placeTags').textContent = `Tags: ${data.Tag1}, ${data.Tag2}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});