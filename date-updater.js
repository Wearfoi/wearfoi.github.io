// Function to format date as YYYY MM DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} ${month} ${day}`;
}

// Function to get current EST time
function getESTDate() {
    const now = new Date();
    // EST is UTC-5 (or UTC-4 during daylight saving time)
    // This is a simplified approach - for production, consider using a library like moment-timezone
    const estOffset = now.getTimezoneOffset() + 300; // EST is normally 300 minutes from UTC
    const estTime = new Date(now.getTime() + estOffset * 60000);
    return estTime;
}

// Function to update the date element
function updateDateElement() {
    const estDate = getESTDate();
    const dateString = formatDate(estDate);
    
    // Find the date element (h1 that contains a date in the format we want)
    const dateElements = document.querySelectorAll('h1');
    let dateElement = null;
    
    for (const el of dateElements) {
        if (el.textContent.match(/\d{4} \d{2} \d{2}/)) {
            dateElement = el;
            break;
        }
    }
    
    // Update the element if found
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

// Function to calculate milliseconds until next midnight EST
function getMsUntilMidnightEST() {
    const now = new Date();
    const estDate = getESTDate();
    
    // Calculate milliseconds until next midnight EST
    const midnight = new Date(estDate);
    midnight.setHours(24, 0, 0, 0);
    
    return midnight.getTime() - estDate.getTime();
}

// Initial update
updateDateElement();

// Set up the daily update at midnight EST
function scheduleMidnightUpdate() {
    const msUntilMidnight = getMsUntilMidnightEST();
    
    setTimeout(() => {
        updateDateElement();
        // Schedule next update for the following day
        setInterval(updateDateElement, 24 * 60 * 60 * 1000); // Update every 24 hours
    }, msUntilMidnight);
}

// Start the scheduling
scheduleMidnightUpdate();