// Disable right-clicking
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('Right-clicking is disabled on this page.');
});

// Array to store song lyrics
let lyricsList = [];

// Function to save lyrics
document.getElementById('saveButton').addEventListener('click', function () {
    const title = document.getElementById('songTitle').value.trim();
    const singer = document.getElementById('singerName').value.trim();
    const lyrics = document.getElementById('songLyrics').value.trim();

    if (title && singer && lyrics) {
        // Add to the array
        lyricsList.push({ title, singer, lyrics });

        // Sort alphabetically by title
        lyricsList.sort((a, b) => a.title.localeCompare(b.title));

        // Clear input fields
        document.getElementById('songTitle').value = '';
        document.getElementById('singerName').value = '';
        document.getElementById('songLyrics').value = '';

        // Update the displayed list
        displayLyrics();
    } else {
        alert('Please enter a title, singer, and lyrics.');
    }
});

// Function to display lyrics
function displayLyrics(filteredList = lyricsList) {
    const listElement = document.getElementById('lyricsList');
    listElement.innerHTML = ''; // Clear the list

    filteredList.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.title}</strong><br>
            <em>Singer: ${item.singer}</em><br>
            <div class="lyrics-content">${item.lyrics}</div>
        `;
        listElement.appendChild(li);
    });
}

// Function to search lyrics
document.getElementById('searchButton').addEventListener('click', function () {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchTerm) {
        const filteredLyrics = lyricsList.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.singer.toLowerCase().includes(searchTerm) ||
            item.lyrics.toLowerCase().includes(searchTerm)
        );
        displayLyrics(filteredLyrics);
    } else {
        displayLyrics(); // Show all lyrics if search term is empty
    }
});

// Initial display
displayLyrics();