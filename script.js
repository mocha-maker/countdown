// HTML Elements
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const datePicker = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let savedCountdown;

// Countdown Elements
const countdownContainer = document.getElementById('countdown');
const countdownTitleLabel = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// Time Units
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let countdownActive;

// Complete Elements
const completeContainer = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Set minimum date limit
const today = new Date().toISOString().split('T')[0];
datePicker.setAttribute('min',today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
    
        // Date Math
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
    
        // Hide Input and Show Countdown
        inputContainer.hidden = true;

        // Check if Finish Countdown
        if (distance < 0) {
            countdownContainer.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeContainer.hidden = false;
        } else {
        countdownContainer.hidden = false;
        // Set countdown labels and elements
        countdownTitleLabel.textContent = countdownTitle;
        timeElements[0].textContent = days;
        timeElements[1].textContent = hours;
        timeElements[2].textContent = minutes;
        timeElements[3].textContent = seconds;
        }
    }, second);
}

// Take Values from Form
function updateCountdown(e) {
    e.preventDefault();

    // Get Countdown Data
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    console.log(localStorage.getItem('countdown'));
    
    // get number version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    if (countdownDate === '') { 
        alert('Please enter a date.'); 
    } else {
        updateDOM();
    }
}

// Reset All Values
function resetCountdown() {
    // Hide Countdowns, show input
    countdownContainer.hidden = true;
    inputContainer.hidden = false;
    // Stop Countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// Restore Saved Countdown
function restoreSavedCountdown() {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', resetCountdown);
completeBtn.addEventListener('click', resetCountdown);

// On Load
restoreSavedCountdown();