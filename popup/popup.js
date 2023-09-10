// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the HTML elements
    const musicSwitch = document.getElementById('musicSwitch');
    const volumeSlider = document.getElementById('volumeSlider');

    // Function to save settings to local storage
    function saveSettings() {
        const settings = {
            musicSwitch: musicSwitch.checked,
            volume: volumeSlider.value
        };
        localStorage.setItem('extensionSettings', JSON.stringify(settings));
    }

    // Function to load settings from local storage and set the musicSwitch state
    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('extensionSettings')) || {};

        // Set the music switch state based on the saved settings or default to "on"
        musicSwitch.checked = savedSettings.hasOwnProperty('musicSwitch') ? savedSettings.musicSwitch : true;

        // Set the volume based on the saved settings or default to 50
        volumeSlider.value = savedSettings.volume || 50;
    }

    // Load settings from local storage when the popup is opened
    loadSettings();

    // Add a listener for the music switch
    musicSwitch.addEventListener('change', function () {
        const action = musicSwitch.checked ? 'play' : 'pause'; // Decide whether to play or pause based on the switch state
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action });
        });

        // Save the updated settings to local storage
        saveSettings();
    });

    // Add a listener for the volume slider
    volumeSlider.addEventListener('input', function () {
        const volume = volumeSlider.value; // Get the current volume value
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'volume', value: volume });
        });

        // Save the updated settings to local storage
        saveSettings();
    });
});
