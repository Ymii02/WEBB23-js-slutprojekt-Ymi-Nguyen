const apiKey = '3c3db135d35b1cbd6c7f3693af259ee0'; 

//här har lagt in min Apikod

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const city = cityInput.value;
  getWeather(city);
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const { name, main, weather, wind } = data;
      const temperature = main.temp;
      const description = weather[0].description;
      const windSpeed = wind.speed;
      const weatherIcon = weather[0].icon;

      const weatherHtml = `
        <h2>${name}</h2>
        <p>Beskrivning: ${description}</p>
        <p>Temperatur: ${temperature}°C</p>
        <p>Vindhastighet: ${windSpeed} m/s</p>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Väderikon">
      `;
      //Här har jag lagt in både en ikon och beskrivning

      weatherInfo.innerHTML = weatherHtml;
      weatherInfo.style.display = 'block';
    })
    .catch(error => {
      console.log('Ett fel uppstod:', error);
      weatherInfo.innerHTML = '<p>Kunde inte hämta väderinformation.</p>';
      weatherInfo.style.display = 'block';
    });
}
