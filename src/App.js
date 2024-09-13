import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'ac71zwlbqc1w580r8ta69vr90wthejbc2jg0896m'; // Substitua pela sua chave da API Weather

  useEffect(() => {
    // Função para obter a localização atual do usuário
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (err) => {
            setError("Não foi possível obter sua localização");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocalização não é suportada pelo seu navegador");
        setLoading(false);
      }
    };

    getLocation();
  }, []);
  <script src="http://localhost:3000"></script>

  useEffect(() => {
    if (location.lat && location.lon) {
      // Faz a chamada para a API Weather
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.hgbrasil.com/weather?API_KEY=SUA-CHAVE`      //AQUIIIIIIIIIIIII
          );
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Erro ao buscar os dados climáticos");
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Condições Climáticas</h1>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Clima: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Vento: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Não foi possível obter os dados climáticos</p>
      )}
    </div>
  );
};

export default WeatherApp;