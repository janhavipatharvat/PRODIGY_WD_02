let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    
    let ms = Math.floor(milliseconds / 10);
    ms = ms < 10 ? "0" + ms : ms;

    document.getElementById("display").innerText =
        h + ":" + m + ":" + s + ":" + ms;

    
}

    // circular progress
    let totalMilliseconds = (seconds * 1000) + milliseconds;
    let progress = (totalMilliseconds / 60000) * 360;

    document.querySelector(".alarm-body").style.background =
        `conic-gradient(#00f2fe ${progress}deg, #0f2027 ${progress}deg)`;
}

function startTimer() {
    if (timer !== null) return;

    timer = setInterval(() => {
        milliseconds += 10;

        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();
    }, 10);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    document.getElementById("lapList").innerHTML = "";
}

function lapTimer() {
    if (timer === null) return;

    let lapTime = document.getElementById("display").innerText;
    let li = document.createElement("li");
    li.innerText = "Lap: " + lapTime;
    document.getElementById("lapList").appendChild(li);
}

/* Button Active Logic */

function setActive(button) {
    document.querySelectorAll(".buttons button")
        .forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

startBtn.addEventListener("click", () => {
    startTimer();
    setActive(startBtn);
});

pauseBtn.addEventListener("click", () => {
    pauseTimer();
    setActive(pauseBtn);
});

resetBtn.addEventListener("click", () => {
    resetTimer();
    setActive(resetBtn);
});

lapBtn.addEventListener("click", () => {
    lapTimer();
    setActive(lapBtn);

});
