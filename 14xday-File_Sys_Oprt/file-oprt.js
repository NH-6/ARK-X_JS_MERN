const fs = require('fs');
const cities = require('./data.json')

async function fetchTemperature(name) {
  const city = cities.find(c=>c.name = name);
  const lat=city.lat;
  const lng=city.lng;
  try {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
    const tempr = data.current_weather.temperature;
    const temprUnit = data.current_weather_units.temperature;
    
    const info =`This is the temperature of the random city ${city.name}: ${tempr}  ${temprUnit}`;
    
    //Write the temperature result 
 fs.writeFile('cityname.txt', info, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`the Temperature for ${city.name} is ${tempr} `);
  });

  } catch (error) {
    console.error('Error fetching temperature:', error);
    return null;
  
}

   //Delete any existing file for the chosen city.
   fs.unlink('input.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully.');
    }
  });
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      console.log('File contents:', data);
      fetchTemperature(data);
    }
  });

  
