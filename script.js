const display = document.getElementById('display');
const waveFront = document.getElementById('wave-front');
const waveBack = document.getElementById('wave-back');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');

let timerInterval = null;
let currentMode = 'work';

const SETTINGS = {
    work: { time: 25 * 60, color: '#ff4d4d' },
    break: { time: 5 * 60, color: '#70a1ff' }
};

function init() {
    const savedEnd = localStorage.getItem('coffin-end');
    const savedMode = localStorage.getItem('coffin-mode');
    
    if (savedMode) {
        currentMode = savedMode;
        updateModeButtons();
    }
    
    if (savedEnd) {
        runLogic(parseInt(savedEnd));
    } else {
        updateUI(SETTINGS[currentMode].time * 1000);
    }
}

function startTimer() {
    if (timerInterval) return;
    const duration = SETTINGS[currentMode].time;
    const endTime = Date.now() + duration * 1000;
    localStorage.setItem('coffin-end', endTime);
    localStorage.setItem('coffin-mode', currentMode);
    runLogic(endTime);
}

function runLogic(endTime) {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const now = Date.now();
        const distance = endTime - now;
        
        if (distance <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            localStorage.removeItem('coffin-end');
            updateUI(0);
            return;
        }
        updateUI(distance);
    }, 1000);
}

function updateUI(ms) {
    const secondsTotal = Math.max(0, Math.floor(ms / 1000));
    const mins = Math.floor(secondsTotal / 60);
    const secs = secondsTotal % 60;
    display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const totalSecs = SETTINGS[currentMode].time;
    const ratio = secondsTotal / totalSecs; 
    
    // Mapping the liquid level to your coffin's 217-1066 height range
    const yOffset = 1000 - (ratio * 800); 
    document.documentElement.style.setProperty('--y-pos', `${yOffset}px`);

    waveFront.style.fill = SETTINGS[currentMode].color;
    waveBack.style.fill = SETTINGS[currentMode].color;
}

function switchMode(mode) {
    currentMode = mode;
    localStorage.removeItem('coffin-end');
    clearInterval(timerInterval);
    timerInterval = null;
    updateModeButtons();
    updateUI(SETTINGS[currentMode].time * 1000);
}

function updateModeButtons() {
    workBtn.classList.toggle('active', currentMode === 'work');
    breakBtn.classList.toggle('active', currentMode === 'break');
}

// Listeners
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('reset-btn').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
workBtn.addEventListener('click', () => switchMode('work'));
breakBtn.addEventListener('click', () => switchMode('break'));

init();
