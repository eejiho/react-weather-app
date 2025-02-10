import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
    return (
        <div className="weather-btn">
            <Button
                variant={`${selectedCity === '' ? 'outline-warning' : 'warning'}`}
                onClick={() => handleCityChange('current')}
            >
                Current Location
            </Button>

            {cities.map((city) => {
                return (
                    <Button
                        variant={`${selectedCity === city ? 'outline-warning' : 'warning'}`}
                        onClick={() => handleCityChange(city)}
                    >
                        {city}
                    </Button>
                )
            })}
        </div>
    );
};

export default WeatherButton;