document.addEventListener('DOMContentLoaded', function () {
    const musicSwitch = document.getElementById('musicSwitch');

    // Check if the user's preference is stored in local storage
    const isMusicEnabled = localStorage.getItem('musicEnabled');

    // If no setting is found or the setting is not a valid boolean, set the default value to "true" and update UI
    if (isMusicEnabled !== 'true' && isMusicEnabled !== 'false') {
        localStorage.setItem('musicEnabled', 'true');
        musicSwitch.checked = true;
    } else {
        // Initialize the switch state based on the stored preference
        musicSwitch.checked = isMusicEnabled === 'true';
    }

    // Function to toggle the music and update storage
    function toggleMusic() {
        const newState = musicSwitch.checked;
        localStorage.setItem('musicEnabled', newState.toString());

        // Perform logic to play/pause the music based on the newState
        if (newState) {
            // Play the music
        } else {
            // Pause the music
        }
    }

    // Add a change event listener to the checkbox
    musicSwitch.addEventListener('change', toggleMusic);
});
