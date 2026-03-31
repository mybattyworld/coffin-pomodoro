// ... [Keep the top variables/init from previous version] ...

function updateUI(ms) {
    const secondsTotal = Math.max(0, Math.floor(ms / 1000));
    const mins = Math.floor(secondsTotal / 60);
    const secs = secondsTotal % 60;
    display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const totalSecs = SETTINGS[currentMode].time;
    const ratio = secondsTotal / totalSecs; 
    
    // Calculated for the 198 to 1013 range of your coffin outline
    // When empty (ratio 0), y is ~1800 (below view)
    // When full (ratio 1), y is ~400 (top of coffin)
    const yOffset = 1800 - (ratio * 1400); 
    
    document.documentElement.style.setProperty('--y-pos', `${yOffset}px`);

    waveFront.style.fill = SETTINGS[currentMode].color;
    waveBack.style.fill = SETTINGS[currentMode].color;
}

// ... [Keep the rest of the switchMode/EventListeners] ...
