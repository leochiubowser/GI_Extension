// Setting 

const audio = document.getElementById('myAudio');
const video = document.getElementById('background-video');
const searchContainer = document.getElementById("search-container");
var loop = true;
var showTime = false;
const savedSettings = JSON.parse(localStorage.getItem('extensionSettings')) || {};
var audioSetting = savedSettings.hasOwnProperty('musicSwitch') ? savedSettings.musicSwitch : true;
audio.volume = savedSettings.volume !== undefined ? parseFloat(savedSettings.volume) / 100 : 0.5;
console.log(audio.volume)

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


    // Pause the audio when the page loses focus
    window.addEventListener('blur', function () {
        if (!audio.paused) {
            audio.pause();
        }
    });

    // Resume the audio when the page regains focus
    window.addEventListener('focus', function () {
        if (audio.paused && audioSetting) {
            audio.play();
        }
    });

    // load setting

    // Add an event listener to receive messages from the popup
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === 'play') {
            audioSetting = true;
            audio.play();
        } else if (message.action === 'pause') {
            audioSetting = false;
            audio.pause();
        } else if (message.action === 'volume') {
            // Adjust the volume based on the value received from the popup
            if (audio) {
                const volume = parseFloat(message.value) / 100; // Convert the value to a decimal between 0 and 1
                audio.volume = volume; // Set the volume
            }
        }
    });


    // Play the audio when the page loads
    if (audioSetting)
        audio.play();
});


