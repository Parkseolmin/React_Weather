import React, { useState } from 'react';

export default function WeatherButton({ cities, setCity, getCurrentLocation }) {
  console.log('cities?', cities);
  return (
    <div className='clearBtnGroup'>
      <button
        className='weatherBox clearBtn'
        onClick={() => getCurrentLocation()}
      >
        Current Weather
      </button>
      {cities.map((item) => (
        <button
          key={item}
          className='weatherBox clearBtn'
          onClick={() => setCity(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
