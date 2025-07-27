async function getWeather() {
  const city = document.getElementById("city").value;

  // Step 1: Get latitude & longitude from Open-Meteo geocoding API
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    document.getElementById("result").innerHTML = "City not found.";
    return;
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // Step 2: Get weather using lat/lon
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const temp = weatherData.current_weather.temperature;
  const wind = weatherData.current_weather.windspeed;

  // Show result
  document.getElementById("result").innerHTML = `
    <h2>${name}, ${country}</h2>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>💨 Wind Speed: ${wind} km/h</p>
    
  `;
}
