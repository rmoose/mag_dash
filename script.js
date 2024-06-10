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
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log weather data to check if it's received correctly
            document.getElementById('weather').innerText = `Temperature: ${data.main.temp}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
