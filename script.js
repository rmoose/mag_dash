document.addEventListener("DOMContentLoaded", function() {
    // Update time and date
    function updateTimeAndDate() {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString();
        document.getElementById('date').innerText = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    setInterval(updateTimeAndDate, 1000); // Update every second
    updateTimeAndDate();

    // Fetch weather data
    const weatherApiKey = '8f1b49544094a0c8fb11234fe2d545eb';
    const city = 'Philadelphia';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather').innerText = `Temperature: ${data.main.temp}°C`;
        });

    // Fetch Google Calendar events
    // Replace 'your_google_calendar_api_key' and 'your_calendar_id' with your actual values
    const calendarApiKey = 'your_google_calendar_api_key';
    const calendarId = 'your_calendar_id';
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${calendarApiKey}`)
        .then(response => response.json())
        .then(data => {
            const eventsList = document.getElementById('events');
            data.items.forEach(event => {
                const listItem = document.createElement('li');
                listItem.innerText = `${event.start.dateTime || event.start.date} - ${event.summary}`;
                eventsList.appendChild(listItem);
            });
        });
});
