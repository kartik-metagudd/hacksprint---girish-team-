// Time Zones List
const timeZones = [
    { name: 'IST', offset: 5.5 }, // Indian Standard Time
    { name: 'GMT', offset: 0 },   // Greenwich Mean Time
    { name: 'CET', offset: 1 },   // Central European Time
    { name: 'EET', offset: 2 },   // Eastern European Time
    { name: 'EST', offset: -5 },  // Eastern Standard Time
    { name: 'CST', offset: -6 },  // Central Standard Time
    { name: 'MST', offset: -7 },  // Mountain Standard Time
    { name: 'PST', offset: -8 },  // Pacific Standard Time
    { name: 'UCT', offset: 0 },   // Coordinated Universal Time
    { name: 'JST', offset: 9 }     // Japan Standard Time
];

// Populate the time zone selector
function populateTimeZones() {
    const zonesSelect = document.getElementById('zones');
    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone.offset;
        option.textContent = zone.name;
        zonesSelect.appendChild(option);
    });
}

// Time Display
function updateClock() {
    const now = new Date();
    const timeZoneOffset = parseFloat(document.getElementById('zones').value);
    const localTime = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000); // Adjust time for selected timezone

    let hours = localTime.getHours();
    let minutes = localTime.getMinutes();
    let seconds = localTime.getSeconds();
    let amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    minutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero to minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds; // Add leading zero to seconds

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('am-pm').textContent = amPm;

    // Date Display
    const date = localTime.toDateString();
    document.getElementById('date').textContent = date;

    // Day/Night Indicator
    document.getElementById('day-night-indicator').textContent = (localTime.getHours() >= 6 && localTime.getHours() < 18) ? "Day" : "Night";

    // Day of the Week Display
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = localTime.getDay();
    document.getElementById('day-of-week').textContent = `Today is: ${dayNames[dayOfWeek]}`;
}

// Initializing the application
populateTimeZones();
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Alarm Functionality
let alarmTime = null;

function setAlarm() {
    const alarmInput = document.getElementById('alarm-time').value;
    if (alarmInput) {
        alarmTime = new Date(); // Create a new Date object for the current time
        const [hours, minutes] = alarmInput.split(':').map(Number); // Split input into hours and minutes
        const timeZoneOffset = parseFloat(document.getElementById('zones').value); // Get selected timezone offset
        alarmTime.setHours(hours - timeZoneOffset, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

        document.getElementById('alarm-status').textContent = `Alarm set for ${alarmInput} ${document.getElementById('zones').selectedOptions[0].text}`; // Show the set time
        checkAlarm();
    } else {
        document.getElementById('alarm-status').textContent = "Please select a time"; // Error message if no time is selected
    }
}

function checkAlarm() {
    const now = new Date();
    if (alarmTime && now >= alarmTime) {
        alert("Alarm Ringing!"); // Alert the user when the alarm goes off
        document.getElementById('alarm-status').textContent = ""; // Clear the status
        alarmTime = null; // Reset the alarm
    }
    setTimeout(checkAlarm, 1000); // Check every second
}

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

function startStopwatch() {
    if (!stopwatchInterval) { // Prevent starting multiple intervals
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.getElementById('stopwatch-time').textContent = formatTime(stopwatchTime);
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null; // Reset the interval
}

function resetStopwatch() {
    stopwatchTime = 0;
    document.getElementById('stopwatch-time').textContent = "00:00:00";
}

function formatTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Countdown Timer
let timerInterval;

function startTimer() {
    let minutes = parseInt(document.getElementById('timer-minutes').value, 10);
    let timeInSeconds = minutes * 60;

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    document.getElementById('timer-display').textContent = formatTime(timeInSeconds); // Display initial time
    timerInterval = setInterval(() => {
        if (timeInSeconds > 0) {
            timeInSeconds--;
            document.getElementById('timer-display').textContent = formatTime(timeInSeconds);
        } else {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);
}

// Custom Themes
function setTheme(theme) {
    document.body.className = theme; // Set body class to either 'light' or 'dark'
}

// Note: The weather function is removed as per your request.
