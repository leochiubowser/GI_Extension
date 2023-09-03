// Setting 

const video = document.getElementById('background-video');
const searchContainer = document.getElementById("search-container");
var loop = true;
var showTime = false;

document.addEventListener('DOMContentLoaded', function () {

    //Search 

    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const searchQuery = document.getElementById('search-input').value;
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

        // Open the Google search results in a new tab
        window.open(googleSearchUrl, '_blank');

        // Clear the search input
        document.getElementById('search-input').value = '';
    });


    //Time

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        // const seconds = String(now.getSeconds()).padStart(2, '0');
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');

        const clockElement = document.getElementById('clock');
        const dateElement = document.getElementById('date');

        if (showTime) {
            video.style.opacity = 0.8;
            clockElement.style.opacity = 1;
            dateElement.style.opacity = 1;
            searchContainer.style.opacity = 1;
        }
        clockElement.textContent = `${hours}:${minutes}`;
        dateElement.textContent = `${year}-${month}-${date}`;
    }

    updateTime(); // Call initially to display the time immediately
    setInterval(updateTime, 1000); // Update the time every second


    //Video 

    let currentSourceIndex = 0;

    // Function to change video source
    function changeVideoSource() {
        currentSourceIndex = (currentSourceIndex + 1) % video.children.length;
        video.src = video.children[currentSourceIndex].src;
        video.load();
        video.play();

        // Remove the 'ended' event listener after the second video starts
        if (currentSourceIndex === 1) {
            showTime = true;
            video.removeEventListener('ended', changeVideoSource);
            if (loop)
                loopVideo();
        }
    }

    function loopVideo() {
        video.addEventListener('ended', () => {
            // Reset the video to the beginning and play it again
            video.currentTime = 0;
            video.play();
        })
    }

    // Listen for the 'ended' event
    video.addEventListener('ended', changeVideoSource);

    // Start playing the first video
    video.play();

    //Audio

    const audio = document.getElementById('myAudio');

    // Pause the audio when the page loses focus
    window.addEventListener('blur', function () {
        if (!audio.paused) {
            audio.pause();
        }
    });

    // Resume the audio when the page regains focus
    window.addEventListener('focus', function () {
        if (audio.paused) {
            audio.play();
        }
    });

    // Play the audio when the page loads (optional)
    audio.play();

});


