function updateUI(ms) {
  const secondsTotal = Math.floor(ms / 1000);
  const totalDuration = SETTINGS[currentMode].time;
  
  // Calculate ratio (0 = empty, 1 = full)
  const ratio = secondsTotal / totalDuration; 
  
  // Calculate Y Offset
  // 150 is the height of our viewBox. 
  // We want the wave to sit at 150 when empty and 0 when full.
  const yOffset = 150 - (ratio * 150); 
  
  wave.style.transform = `translateY(${yOffset}px)`;
  
  // Optional: Change wave color based on mode
  wave.style.fill = SETTINGS[currentMode].color;

  // Update text
  const mins = Math.floor(secondsTotal / 60);
  const secs = secondsTotal % 60;
  display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}