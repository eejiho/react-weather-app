import React from "react";

const WeatherBox = ({ weather, icon }) => {
    const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    return (
        <div className="weather-box">
            <div>{ weather && weather.name }</div>
            <h2> { weather && `${weather.main.temp>0?Math.floor(weather.main.temp):weather.main.temp}`}ºC  <img src={ imageUrl } alt="" height="50"/></h2>
            <h3> { weather && weather.weather[0].description } </h3> 
        </div>
    );
};

export default WeatherBox;