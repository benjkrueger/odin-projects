const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');


function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const secondsDegrees = (seconds * 6) + 90;
    const minutesDegrees = (minutes * 6) + 90;
    const hoursDegrees = (hours / 12 * 360) + 90;
    console.log(secondsDegrees)
    if (seconds === 0) {
        secondHand.style.transitionDuration = "0s";
        minuteHand.style.transitionDuration = "0s";
        hourHand.style.transitionDuration = "0s";
    } else {
        secondHand.style.transitionDuration = "0.05s";
        minuteHand.style.transitionDuration = "0.05s";
        hourHand.style.transitionDuration = "0.05s";
    }
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(setDate, 1000);