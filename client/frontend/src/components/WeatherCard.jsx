import React from 'react';

const WeatherCard = ({ location, current }) => {
  return (
    <div style={{ border: '2px solid #ccc', padding: '6px', borderRadius: '8px', margin: '16px', width: '400px' }}>
      <h2>{location.name}, {location.country}</h2>
      <p>Temperatura: {current.temp_c}°C</p>
      <p>Condición: {current.condition.text}</p>
      <p>Viento: {current.wind_kph} km/h, Dirección: {current.wind_dir}</p>
      <p>Humedad: {current.humidity}%</p>
      {/* Otros detalles que desees mostrar */}
    </div>
  );
};

export default WeatherCard;
