import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard'; // Ajusta la ruta según tu estructura de archivos

const Clima= () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Reemplaza 'API_KEY' con tu clave de API de WeatherStack
        const apiKey = 'eaa6c90368ba48e3ba6180316242201';
        const city = 'Buenos Aires';
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del clima', error);
      }
    };

    // Llama a la función para obtener datos cuando se monta el componente
    fetchWeatherData();
  }, []); // La dependencia vacía asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      {weatherData && <WeatherCard location={weatherData.location} current={weatherData.current} />}
    </div>
  );
};

export default Clima;
