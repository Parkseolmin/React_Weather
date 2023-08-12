import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faSmog,
  faCloudRain,
  faCloudBolt,
  faSnowflake,
  faTemperatureThreeQuarters,
} from '@fortawesome/free-solid-svg-icons';

export default function WeatherBox(props) {
  // 화씨를 섭씨로 변환하는 함수
  const covertToFahrenheit = (temperature) => {
    const celsius = (temperature - 32) / 1.8;
    return celsius.toFixed(2);
  };

  // 날씨 설명에 따라 이미지 파일 경로를 반환하는 함수
  const getWeatherIcon = (description) => {
    switch (description) {
      case 'clear sky':
        return <FontAwesomeIcon icon={faSun} />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <FontAwesomeIcon icon={faCloud} />;

      case 'mist':
      case 'fog':
      case 'haze':
        return <FontAwesomeIcon icon={faSmog} />;

      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
      case 'heavy intensity rain':
        return <FontAwesomeIcon icon={faCloudRain} />;

      case 'thunderstorm':
        return <FontAwesomeIcon icon={faCloudBolt} />;

      case 'snow':
        return <FontAwesomeIcon icon={faSnowflake} />;

      default:
        return <FontAwesomeIcon icon={faTemperatureThreeQuarters} />;
    }
  };

  console.log('weather?', props);
  return (
    <div>
      <div className='weatherBox weatherContent'>
        <h1>{props.weather?.name}</h1>
        <div className='weatherDetail'>
          <span>
            기온 {props.weather?.main.temp} &#8451; /{' '}
            {covertToFahrenheit(props.weather?.main.temp)} &#8457;
          </span>
          <span>체감온도 {props.weather?.main.feels_like} &#8451; </span>
          <span>습도 {props.weather?.main.humidity} &#37; </span>
          <span>상태 : {props.weather?.weather[0].description}</span>
          <span style={{ fontSize: '5rem' }}>
            {getWeatherIcon(props.weather?.weather[0].description)}
          </span>
        </div>
      </div>
    </div>
  );
}
