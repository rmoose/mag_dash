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
    const weatherApiKey = '8f1b49544094a0c8fb11234fe2d545eb'; // Your OpenWeatherMap API Key
    const city = 'Philadelphia';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('weather').innerText = `Temperature: ${data.main.temp.toFixed(1)}°C`; // Rounded to 1 decimal place
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

    // Fetch Google Calendar events with API key
    const apiKey = 'AIzaSyA0UN453NiPq7-l4qsx4WkouP4N7v89Ejo'; // Your Google API Key
    const calendarId = 'ryan.musso94@gmail.com'; // Your Calendar ID
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch calendar events');
            }
            return response.json();
        })
        .then(data => {
            const eventsList = document.getElementById('events');
            eventsList.innerHTML = ''; // Clear existing list
            data.items.slice(0, 5).forEach(event => {
                const listItem = document.createElement('li');
                listItem.innerText = `${event.start.dateTime || event.start.date} - ${event.summary}`;
                eventsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching calendar events:', error);
        });
});
