import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import { ClipLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const cities = ['paris', 'new york', 'tokyo', 'seoul'];

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState('');

  // 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  }

  // 현재 위치의 날씨 정보
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setIcon(data.weather[0].icon);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // 도시별 날짜 가져오기
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appId=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setIcon(data.weather[0].icon);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  const handleCityChange = (city) => {
    if(city === 'current') {
      setCity('');
    } else {
      setCity(city);
    }
  }

  useEffect(() => {
    if(city === "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#ff0000" loading={loading} size={100} />
        </div>
      ): (
        <div className="container">
          <WeatherBox weather={weather} icon={icon} />
          <WeatherButton 
              cities={cities}
              selectedCity={city}
              handleCityChange={handleCityChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
