import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import CurrentTime from './component/CurrentTime';
import ClipLoader from 'react-spinners/ClipLoader';

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태
// 3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재 위치버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  // 날씨 정보를 담는 변수
  const [weather, setWeather] = useState(null);
  // 선택된 도시의 이름을 담는 변수
  const [city, setCity] = useState('');
  // 데이터 로딩 상태를 나타내는 변수
  const [loading, setLoading] = useState(false);
  // 도시명 배열, WeatherButton컴포넌트에서 사용
  const cities = ['Paris', 'New York', 'Tokyo', 'Seoul'];

  // 현재 위치를 가져와서 해당 위치의 날씨를 가져오는 역할
  // navigator.geolocation.getCurrentPosition 메서드를 사용하여
  // 라우저에서 현재 위치 정보를 얻고,
  // 그 정보를 기반으로 getWeatherByCurrentLocation 함수를 호출
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 위도와 경도를 기반으로 OpenWeatherMap API를 사용하여 현재 위치의 날씨 정보를 가져옴
  // 데이터를 가져온 후에 setWeather함수를 사용하여 날씨 정보를 업데이트 함
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1da06cfba173e394bacde6d9fe4a796f&units=metric`;
    setLoading(true);
    let response = await fetch(url); //비동기
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  // getWeatherByCity함수는 선택된 도시의 날씨 정보를 가져옴
  // 데이터를 가져온 후에는 setWeather함수를 사용하여 날씨 정보를 업데이트 함
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1da06cfba173e394bacde6d9fe4a796f&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  // useEffect훅을 사용하여 컴포넌트가 렌더링될 때와 city가 변경될 때마다
  // 실행되는 부수 효과를 정의
  // 1) 초기 렌더링 시 city가 빈 문자열이면 getCurrentLocation 함수를 호출하여
  // 현재 위치의 날씨 정보를 가져옴
  // 2) city가 변경될 때마다 getWeatherByCity 함수를 호출하여
  // 선택된 도시의 날씨 정보를 가져옵니다.
  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div style={{ marginTop: '2rem' }}>
      {loading ? (
        <div className='container'>
          <ClipLoader
            color='#CCE1FF'
            loading={loading}
            size={50}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <div className='container'>
          <CurrentTime />
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
