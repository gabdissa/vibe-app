/**
const moodToSongs = {
    happy: ["Happy – Pharrell Williams", "Good as Hell – Lizzo"],
    sad: ["Someone Like You – Adele", "Fix You – Coldplay"],
    angry: ["Break Stuff – Limp Bizkit", "Killing in the Name – Rage Against the Machine"],
    chill: ["Sunset Lover – Petit Biscuit", "Lo-fi Chillhop Beats"],
    energetic: ["Can't Hold Us – Macklemore", "Titanium – David Guetta"],
}; **/

const moodToSongs = { //need title and youtubeID to embedd videos
    happy: [
        { title: "Happy – Pharrell Williams", youtubeId: "ZbZSe6N_BXs" },
        { title: "Good as Hell – Lizzo", youtubeId: "SSO_5d4N0Vw" },
    ],
    sad: [
        { title: "Someone Like You – Adele", youtubeId: "hLQl3WQQoQ0" },
        { title: "Fix You – Coldplay", youtubeId: "k4V3Mo61fJM" },
    ],
    angry: [
        { title: "Break Stuff – Limp Bizkit", youtubeId: "ZpUYjpKg9KY" },
        { title: "Killing in the Name – RATM", youtubeId: "bWXazVhlyxQ" },
    ],
    chill: [
        { title: "Sunset Lover – Petit Biscuit", youtubeId: "4HV8tGmj9Ns" },
        { title: "Lo-fi Chillhop Beats", youtubeId: "5qap5aO4i9A" },
    ],
    energetic: [
        { title: "Can't Hold Us – Macklemore", youtubeId: "2zNSgSzhBfM" },
        { title: "Titanium – David Guetta", youtubeId: "JRfuAukYTKg" },
    ],
};

function detectMood(input) {
    const text = input.toLowerCase();

    if (text.includes("happy") || text.includes("joy") || text.includes("excited")) return "happy";
    if (text.includes("sad") || text.includes("down") || text.includes("depressed")) return "sad";
    if (text.includes("angry") || text.includes("mad") || text.includes("frustrated")) return "angry";
    if (text.includes("chill") || text.includes("relaxed") || text.includes("calm")) return "chill";
    if (text.includes("pumped") || text.includes("hype") || text.includes("energetic")) return "energetic";

    return "chill"; // default mood
}

/** BASIC
function getRandomSong(mood) { //declares a function that accepts one arg (mood ex. 'happy')
    const songs = moodToSongs[mood]; //looks up mood in my object
    return songs[Math.floor(Math.random() * songs.length)]; //returns a random song in the selected mood dictionary
}**/

function getRandomSong(mood) { //new function to return  song object for embedded video
    const songs = moodToSongs[mood]; //looks up mood in my object
    return songs[Math.floor(Math.random() * songs.length)]; //returns a random object in the selected mood dictionary
}

/** BASIC
window.recommendSong = function () { //function when a user clicks "Get a song"
    const input = document.getElementById("feelingInput").value; //grabs the value from the input field in index.js with ID="feelingInput"
    const mood = detectMood(input); //putting user input answer into the detectmood function and return mood ex. "happy"
    const song = getRandomSong(mood); //passes the return mood into getrandomsong function and return a song in mood key

    document.getElementById("songOutput").innerText = `Vibe match: ${song}`;
};**/

window.recommendSong = function () { //function when a user clicks "Get a song"
    const input = document.getElementById("feelingInput").value.trim();

    if (!input) return; //if input is empty, do nothing

    const mood = detectMood(input); //putting user input answer into the detectmood function and return mood ex. "happy"
    const song = getRandomSong(mood); //passes the return mood into getrandomsong function and return a song in mood key

    const displayMood = mood || "something chill"; //handle missing mood just in case

    document.getElementById("songOutput").innerText = `Vibe match: "${displayMood}": ${song.title}`;

    // Insert video
    const videoEmbed = `
    <iframe class="video-frame" width="560" height="315" 
      src="https://www.youtube.com/embed/${song.youtubeId}?autoplay=1" 
      title="YouTube video player"
      allow="autoplay; encrypted-media" 
      allowfullscreen>
    </iframe>
  `;
    document.getElementById("videoContainer").innerHTML = videoEmbed;

    document.getElementById("feelingInput").value = ""; //clear input + refocus
    document.getElementById("feelingInput").focus();
};

//re-enable button when user types
document.getElementById("feelingInput").addEventListener("input", (e) => {
    const button = document.querySelector("button");
    button.disabled = e.target.value.trim() === "";
});