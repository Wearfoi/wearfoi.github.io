function updateESTClock() {
    const clockElement = document.getElementById('est-clock');
    if (!clockElement) return;

    const now = new Date();
    
    // Convert to EST (auto-adjusts for DST)
    now.toLocaleString('en-US', { timeZone: 'America/New_York' });
    
    // Extract hours, minutes, seconds (12-hour format, no AM/PM)
    const hours = now.getHours() % 12 || 12; // Converts 0 to 12
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Format: "H:MM:SS EST" (no AM/PM)
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateESTClock();
setInterval(updateESTClock, 1000);